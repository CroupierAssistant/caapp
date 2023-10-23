const mongoose = require("mongoose");

const UTHBlindSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const UTHBlindResult = mongoose.model("UTHBlindResult", UTHBlindSchema);

module.exports = UTHBlindResult;
