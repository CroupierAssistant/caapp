const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const NeighboursSchema = new mongoose.Schema({
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

const NeighboursResult = connectionResults.model('NeighboursResult', NeighboursSchema);

module.exports = NeighboursResult;