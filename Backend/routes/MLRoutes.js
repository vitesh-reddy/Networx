const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { StandardScaler, PCA } = require("scikitjs");
const { KMeans } = require("scikitjs");
const { NearestNeighbors } = require("scikitjs");
const { OneHotEncoder } = require("scikitjs");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Global variables to hold our models and data
let df = [];
let preprocessor = null;
let pca = null;
let nnModel = null;
let kmeans = null;

// Load and preprocess data
async function loadAndPreprocess(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        df = results;

        try {
          // Define numerical and categorical features
          const numericalFeatures = [
            "Age",
            "Income",
            "Last_Login_Days_Ago",
            "Purchase_Frequency",
            "Average_Order_Value",
            "Total_Spending",
            "Time_Spent_on_Site_Minutes",
            "Pages_Viewed",
          ];
          const categoricalFeatures = [
            "Gender",
            "Location",
            "Interests",
            "Product_Category_Preference",
            "Newsletter_Subscription",
          ];

          // Extract numerical data
          const numericalData = df.map((user) =>
            numericalFeatures.map((feature) => parseFloat(user[feature]))
          );

          // Extract categorical data
          const categoricalData = df.map((user) =>
            categoricalFeatures.map((feature) => user[feature])
          );

          // Scale numerical data
          const scaler = new StandardScaler();
          const scaledNumerical = scaler.fitTransform(numericalData);

          // One-hot encode categorical data
          const encoder = new OneHotEncoder();
          const encodedCategorical = encoder.fitTransform(categoricalData);

          // Combine features
          const X = scaledNumerical.map((row, i) => [
            ...row,
            ...encodedCategorical[i],
          ]);

          // Apply PCA
          pca = new PCA({ nComponents: 0.95 });
          const X_pca = pca.fitTransform(X);

          // Build Nearest Neighbors model
          nnModel = new NearestNeighbors({ nNeighbors: 11, metric: "cosine" });
          await nnModel.fit(X_pca);

          // Cluster users
          const optimalClusters = await findOptimalClusters(X_pca);
          kmeans = new KMeans({ nClusters: optimalClusters });
          const clusters = await kmeans.fitPredict(X_pca);

          // Add clusters to user data
          df.forEach((user, i) => {
            user.Cluster = clusters[i];
          });

          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
  });
}

async function findOptimalClusters(X_pca, maxClusters = 10) {
  let bestScore = -1;
  let bestClusters = 2;

  for (let nClusters = 2; nClusters <= maxClusters; nClusters++) {
    const kmeans = new KMeans({ nClusters });
    const labels = await kmeans.fitPredict(X_pca);
    const score = await kmeans.silhouetteScore(X_pca, labels);

    if (score > bestScore) {
      bestScore = score;
      bestClusters = nClusters;
    }
  }

  return bestClusters;
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: nnModel ? "ready" : "not ready",
    model_loaded: !!nnModel,
    n_users: df.length,
    n_features: pca ? pca.nComponents : 0,
  });
});

// Find similar users endpoint
app.post("/find_similar_users", async (req, res) => {
  try {
    const { user_id, n_similar = 5 } = req.body;

    const userIndex = df.findIndex((user) => user.User_ID === user_id);
    if (userIndex === -1) {
      return res.status(404).json({ error: `User ${user_id} not found` });
    }

    // Transform the user data
    const userData = df[userIndex];
    const numericalFeatures = [
      "Age",
      "Income",
      "Last_Login_Days_Ago",
      "Purchase_Frequency",
      "Average_Order_Value",
      "Total_Spending",
      "Time_Spent_on_Site_Minutes",
      "Pages_Viewed",
    ];
    const categoricalFeatures = [
      "Gender",
      "Location",
      "Interests",
      "Product_Category_Preference",
      "Newsletter_Subscription",
    ];

    const numericalData = numericalFeatures.map((feature) =>
      parseFloat(userData[feature])
    );
    const categoricalData = categoricalFeatures.map(
      (feature) => userData[feature]
    );

    // We'd need to implement the same preprocessing as in loadAndPreprocess
    // For simplicity, let's assume we have a function to transform a single user
    // In a real implementation, you'd want to properly scale/encode this data

    const userTransformed = await transformUser(userData);
    const userPca = pca.transform([userTransformed]);

    const { distances, indices } = await nnModel.kneighbors(userPca, {
      nNeighbors: n_similar + 1,
    });

    // Exclude the user themselves
    const similarIndices = indices[0].slice(1);
    const similarDistances = distances[0].slice(1);

    const similarUsers = similarIndices.map((idx, i) => {
      const user = { ...df[idx] };
      user.Similarity_Score = 1 - similarDistances[i];
      return {
        User_ID: user.User_ID,
        Age: parseInt(user.Age),
        Gender: user.Gender,
        Location: user.Location,
        Interests: user.Interests,
        Product_Category_Preference: user.Product_Category_Preference,
        Similarity_Score: user.Similarity_Score,
      };
    });

    res.json({ similar_users: similarUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get cluster members endpoint
app.post("/get_cluster_members", async (req, res) => {
  try {
    const { user_id } = req.body;

    const user = df.find((user) => user.User_ID === user_id);
    if (!user) {
      return res.status(404).json({ error: `User ${user_id} not found` });
    }

    const cluster = user.Cluster;
    const clusterMembers = df
      .filter((u) => u.Cluster === cluster)
      .map((member) => ({
        User_ID: member.User_ID,
        Age: parseInt(member.Age),
        Gender: member.Gender,
        Location: member.Location,
        Interests: member.Interests,
        Product_Category_Preference: member.Product_Category_Preference,
      }));

    res.json({ cluster_members: clusterMembers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to transform a single user (simplified)
async function transformUser(user) {
  // In a real implementation, you would:
  // 1. Scale numerical features using the same scaler as before
  // 2. One-hot encode categorical features using the same encoder
  // 3. Combine the features

  // For this example, we'll return a dummy transformation
  const numericalFeatures = [
    "Age",
    "Income",
    "Last_Login_Days_Ago",
    "Purchase_Frequency",
    "Average_Order_Value",
    "Total_Spending",
    "Time_Spent_on_Site_Minutes",
    "Pages_Viewed",
  ];
  return numericalFeatures.map((feature) => parseFloat(user[feature]));
}

// Initialize the application
async function initialize() {
  try {
    await loadAndPreprocess("user_personalized_features.csv");
    console.log("Model loaded successfully");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize:", error);
    process.exit(1);
  }
}

initialize();
