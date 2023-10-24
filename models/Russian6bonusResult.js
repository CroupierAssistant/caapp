const mongoose = require('mongoose');

const Russian6bonusSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: Number,
  showUserData: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Russian6bonusResult = mongoose.model('Russian6bonusResult', Russian6bonusSchema);

module.exports = Russian6bonusResult;