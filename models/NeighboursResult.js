const mongoose = require('mongoose');

const NeighboursSchema = new mongoose.Schema({
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

const NeighboursResult = mongoose.model('NeighboursResult', NeighboursSchema);

module.exports = NeighboursResult;