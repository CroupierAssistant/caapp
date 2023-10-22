const mongoose = require('mongoose');

const Russian6bonusSchema = new mongoose.Schema({
  username: String,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Russian6bonusResult = mongoose.model('Russian6bonusResult', Russian6bonusSchema);

module.exports = Russian6bonusResult;