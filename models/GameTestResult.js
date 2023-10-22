const mongoose = require('mongoose');

const gameTestResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Предполагается, что у вас есть коллекция 'User'
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
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const GameTestResult = mongoose.model('GameTestResult', gameTestResultSchema, 'gameTestResults');

module.exports = GameTestResult;
