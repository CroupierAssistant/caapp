const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
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

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;