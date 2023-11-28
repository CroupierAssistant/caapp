const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const RouletteSeriesSchema = new mongoose.Schema({
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
  showUserData: Boolean,
});

const RouletteSeriesResult = connectionResults.model('RouletteSeriesResult', RouletteSeriesSchema);

module.exports = RouletteSeriesResult;