const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ],
  interests: [{ type: String }],
  groupChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

module.exports = mongoose.model("Event", eventSchema);
