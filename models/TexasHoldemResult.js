const mongoose = require('mongoose');

const TexasHoldemSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: Number,
  showUserData: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const TexasHoldemResult = mongoose.model('TexasHoldemResult', TexasHoldemSchema);

module.exports = TexasHoldemResult;