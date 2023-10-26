const mongoose = require("mongoose");

const UTHBlindSchema = new mongoose.Schema({
  userId: String,
  username: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

const UTHBlindResult = mongoose.model("UTHBlindResult", UTHBlindSchema);

module.exports = UTHBlindResult;
