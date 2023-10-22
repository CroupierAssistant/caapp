const mongoose = require('mongoose');

const RussianAnteSchema = new mongoose.Schema({
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

const RussianAnteResult = mongoose.model('RussianAnteResult', RussianAnteSchema);

module.exports = RussianAnteResult;