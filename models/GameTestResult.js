const mongoose = require('mongoose');

const gameTestResultSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  timeTaken: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const GameTestResult = mongoose.model('GameTestResult', gameTestResultSchema, 'gameTestResults');

module.exports = GameTestResult;
