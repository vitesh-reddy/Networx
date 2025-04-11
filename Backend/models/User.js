const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  locality: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  interests: [{ type: String }],
  attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = mongoose.model("User", userSchema);
