const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const TexasHoldemSchema = new mongoose.Schema({
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

const TexasHoldemResult = connectionResults.model('TexasHoldemResult', TexasHoldemSchema);

module.exports = TexasHoldemResult;