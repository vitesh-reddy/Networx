const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commonInterests: [{ type: String }],
});

module.exports = mongoose.model("Match", matchSchema);
