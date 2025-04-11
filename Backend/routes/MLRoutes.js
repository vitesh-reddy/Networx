// MLRoutes.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

// Use TensorFlow.js with native bindings for speed
const tf = require("@tensorflow/tfjs-node");
const sk = require("scikitjs");
sk.setBackend(tf);

// Import scikitjs models
const { StandardScaler, LinearRegression, PCA, KMeans, NearestNeighbors, OneHotEncoder } = sk;

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

// Global variables
let df = [];
let preprocessor = null;
let pca = null;
let nnModel = null;
let kmeans = null;
let scaler = null;
let encoder = null;

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

          const numericalData = df.map((user) =>
            numericalFeatures.map((feature) => parseFloat(user[feature]))
          );
          const categoricalData = df.map((user) =>
            categoricalFeatures.map((feature) => user[feature])
          );

          scaler = new StandardScaler();
          const scaledNumerical = scaler.fitTransform(numericalData).arraySync();

          encoder = new OneHotEncoder();
          const encodedCategorical = encoder.fitTransform(categoricalData).arraySync();

          const X = scaledNumerical.map((row, i) => [
            ...row,
            ...encodedCategorical[i],
          ]);

          pca = new PCA({ nComponents: 0.95 });
          const X_pca = pca.fitTransform(X).arraySync();

          nnModel = new NearestNeighbors({ nNeighbors: 11, metric: "cosine" });
          await nnModel.fit(X_pca);

          const optimalClusters = await findOptimalClusters(X_pca);
          kmeans = new KMeans({ nClusters: optimalClusters });
          const clusters = await kmeans.fitPredict(X_pca);

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

async function transformUser(user) {
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

  const numValues = numericalFeatures.map((f) => parseFloat(user[f]));
  const catValues = categoricalFeatures.map((f) => user[f]);

  const scaled = scaler.transform([numValues]).arraySync()[0];
  const encoded = encoder.transform([catValues]).arraySync()[0];

  return [...scaled, ...encoded];
}

// Endpoints
router.get("/health", (req, res) => {
  res.json({
    status: nnModel ? "ready" : "not ready",
    model_loaded: !!nnModel,
    n_users: df.length,
    n_features: pca ? pca.nComponents : 0,
  });
});

router.post("/find_similar_users", async (req, res) => {
  try {
    const { user_id, n_similar = 5 } = req.body;
    const userIndex = df.findIndex((user) => user.User_ID === user_id);
    if (userIndex === -1) {
      return res.status(404).json({ error: `User ${user_id} not found` });
    }

    const userData = df[userIndex];
    const transformed = await transformUser(userData);
    const userPca = pca.transform([transformed]).arraySync();

    const { distances, indices } = await nnModel.kneighbors(userPca, {
      nNeighbors: n_similar + 1,
    });

    const similarIndices = indices[0].slice(1);
    const similarDistances = distances[0].slice(1);

    const similarUsers = similarIndices.map((idx, i) => {
      const user = { ...df[idx] };
      return {
        User_ID: user.User_ID,
        Age: parseInt(user.Age),
        Gender: user.Gender,
        Location: user.Location,
        Interests: user.Interests,
        Product_Category_Preference: user.Product_Category_Preference,
        Similarity_Score: 1 - similarDistances[i],
      };
    });

    res.json({ similar_users: similarUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/get_cluster_members", (req, res) => {
  const { user_id } = req.body;

  const user = df.find((u) => u.User_ID === user_id);
  if (!user) {
    return res.status(404).json({ error: `User ${user_id} not found` });
  }

  const cluster = user.Cluster;
  const members = df
    .filter((u) => u.Cluster === cluster)
    .map((member) => ({
      User_ID: member.User_ID,
      Age: parseInt(member.Age),
      Gender: member.Gender,
      Location: member.Location,
      Interests: member.Interests,
      Product_Category_Preference: member.Product_Category_Preference,
    }));

  res.json({ cluster_members: members });
});

async function initializeFastAPI() {
  try {
    await loadAndPreprocess("user_personalized_features.csv");
    console.log("FastAPI module initialized.");
  } catch (err) {
    console.error("FastAPI init error:", err);
  }
}

module.exports = { fastapiRouter: router, initializeFastAPI };
