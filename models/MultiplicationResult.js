const mongoose = require('mongoose');

const MultiplicationSchema = new mongoose.Schema({
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

const MultiplicationResult = mongoose.model('MultiplicationResult', MultiplicationSchema);

module.exports = MultiplicationResult;