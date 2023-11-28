const mongoose = require('mongoose');
const { connectionResults } = require('../db');

const UTHTripsSchema = new mongoose.Schema({
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

const UTHTripsResult = connectionResults.model('UTHTripsResult', UTHTripsSchema);

module.exports = UTHTripsResult;