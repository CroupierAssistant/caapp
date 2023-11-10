const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const MultiplicationSchema = new mongoose.Schema({
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

const MultiplicationResult = connectionResults.model('MultiplicationResult', MultiplicationSchema);

module.exports = MultiplicationResult;