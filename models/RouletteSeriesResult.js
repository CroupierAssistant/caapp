const mongoose = require('mongoose');

const RouletteSeriesSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: String,
  showUserData: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const RouletteSeriesResult = mongoose.model('RouletteSeriesResult', RouletteSeriesSchema);

module.exports = RouletteSeriesResult;