const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  maxParticipants: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
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
