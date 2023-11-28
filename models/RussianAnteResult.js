const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const RussianAnteSchema = new mongoose.Schema({
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

const RussianAnteResult = connectionResults.model('RussianAnteResult', RussianAnteSchema);

module.exports = RussianAnteResult;