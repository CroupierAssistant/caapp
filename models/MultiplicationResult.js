const mongoose = require('mongoose');

const MultiplicationSchema = new mongoose.Schema({
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

const MultiplicationResult = mongoose.model('MultiplicationResult', MultiplicationSchema);

module.exports = MultiplicationResult;