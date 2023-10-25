const mongoose = require('mongoose');

const TexasHoldemSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  showUserData: Boolean,
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