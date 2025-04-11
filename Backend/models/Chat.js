const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  avatar: { type: String },
  isGroup: { type: Boolean, default: false },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);