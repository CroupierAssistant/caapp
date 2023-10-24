const mongoose = require('mongoose');

const RussianAnteSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: Number,
  showUserData: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const RussianAnteResult = mongoose.model('RussianAnteResult', RussianAnteSchema);

module.exports = RussianAnteResult;