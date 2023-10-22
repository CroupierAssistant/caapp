const mongoose = require('mongoose');

const UTHTripsSchema = new mongoose.Schema({
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

const UTHTripsResult = mongoose.model('UTHTripsResult', UTHTripsSchema);

module.exports = UTHTripsResult;