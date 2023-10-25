const mongoose = require("mongoose");

const UTHBlindSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  showUserData: Boolean,
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
