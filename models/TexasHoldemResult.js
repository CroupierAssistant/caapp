const mongoose = require('mongoose');

const TexasHoldemSchema = new mongoose.Schema({
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

const TexasHoldemResult = mongoose.model('TexasHoldemResult', TexasHoldemSchema);

module.exports = TexasHoldemResult;