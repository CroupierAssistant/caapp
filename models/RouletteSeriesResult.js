const mongoose = require('mongoose');

const RouletteSeriesSchema = new mongoose.Schema({
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

const RouletteSeriesResult = mongoose.model('RouletteSeriesResult', RouletteSeriesSchema);

module.exports = RouletteSeriesResult;