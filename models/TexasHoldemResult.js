const mongoose = require('mongoose');

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

const TexasHoldemResult = mongoose.model('TexasHoldemResult', TexasHoldemSchema);

module.exports = TexasHoldemResult;