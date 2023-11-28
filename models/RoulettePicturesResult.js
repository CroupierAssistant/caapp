const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const RoulettePicturesSchema = new mongoose.Schema({
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

const RoulettePicturesResult = connectionResults.model('RoulettePicturesResult', RoulettePicturesSchema);

module.exports = RoulettePicturesResult;