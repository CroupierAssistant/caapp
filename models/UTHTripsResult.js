const mongoose = require('mongoose');

const UTHTripsSchema = new mongoose.Schema({
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

const UTHTripsResult = mongoose.model('UTHTripsResult', UTHTripsSchema);

module.exports = UTHTripsResult;