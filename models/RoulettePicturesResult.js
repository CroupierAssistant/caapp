const mongoose = require('mongoose');

const RoulettePicturesSchema = new mongoose.Schema({
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

const RoulettePicturesResult = mongoose.model('RoulettePicturesResult', RoulettePicturesSchema);

module.exports = RoulettePicturesResult;