const mongoose = require('mongoose');

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

const NeighboursResult = mongoose.model('NeighboursResult', NeighboursSchema);

module.exports = NeighboursResult;