const mongoose = require('mongoose');

const NeighboursSchema = new mongoose.Schema({
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

const NeighboursResult = mongoose.model('NeighboursResult', NeighboursSchema);

module.exports = NeighboursResult;