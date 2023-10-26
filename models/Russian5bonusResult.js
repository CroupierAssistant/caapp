const mongoose = require('mongoose');

const Russian5bonusSchema = new mongoose.Schema({
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

const Russian5bonusResult = mongoose.model('Russian5bonusResult', Russian5bonusSchema);

module.exports = Russian5bonusResult;