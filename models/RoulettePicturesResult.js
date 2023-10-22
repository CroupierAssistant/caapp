const mongoose = require('mongoose');

const RoulettePicturesSchema = new mongoose.Schema({
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

const RoulettePicturesResult = mongoose.model('RoulettePicturesResult', RoulettePicturesSchema);

module.exports = RoulettePicturesResult;