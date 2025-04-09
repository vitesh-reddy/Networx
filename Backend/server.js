const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRoutes");

console.clear();
dotenv.config();

const REACT_BASE_URI = process.env.REACT_BASE_URI;
const cors = require("cors");
const corsOptions = { origin: [REACT_BASE_URI] };

const app = express();
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
