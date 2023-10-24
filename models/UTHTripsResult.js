const mongoose = require('mongoose');

const UTHTripsSchema = new mongoose.Schema({
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

const UTHTripsResult = mongoose.model('UTHTripsResult', UTHTripsSchema);

module.exports = UTHTripsResult;