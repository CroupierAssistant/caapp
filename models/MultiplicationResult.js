const mongoose = require('mongoose');

const MultiplicationSchema = new mongoose.Schema({
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

const MultiplicationResult = mongoose.model('MultiplicationResult', MultiplicationSchema);

module.exports = MultiplicationResult;