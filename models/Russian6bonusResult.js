const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const Russian6bonusSchema = new mongoose.Schema({
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
  showUserData: Boolean,
});

const Russian6bonusResult = connectionResults.model('Russian6bonusResult', Russian6bonusSchema);

module.exports = Russian6bonusResult;