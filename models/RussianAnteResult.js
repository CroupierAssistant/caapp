const mongoose = require('mongoose');

const RussianAnteSchema = new mongoose.Schema({
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

const RussianAnteResult = mongoose.model('RussianAnteResult', RussianAnteSchema);

module.exports = RussianAnteResult;