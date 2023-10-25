const mongoose = require('mongoose');

const RouletteSeriesSchema = new mongoose.Schema({
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

const RouletteSeriesResult = mongoose.model('RouletteSeriesResult', RouletteSeriesSchema);

module.exports = RouletteSeriesResult;