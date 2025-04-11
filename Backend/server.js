const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { userRouter } = require("./routes/userRoutes");
const { chatRouter } = require("./routes/chatRoutes");
// const { fastapiRouter, initializeFastAPI } = require("./routes/MLRoutes");

console.clear();
dotenv.config();

const app = express();
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
// initializeFastAPI();

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
// app.use("/api/ML", fastapiRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});