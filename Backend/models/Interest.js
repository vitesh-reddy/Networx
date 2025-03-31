const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Interest", interestSchema);
