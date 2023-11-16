const mongoose = require("mongoose");
const { connectionResults } = require('../db');

const TestLogSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  game: String,
  amountOfCards: Number, 
  percentage: Number,
  time: String,
  timestamp: { type: Date, default: Date.now },
});

const TestLog = connectionResults.model("TestLog", TestLogSchema);

module.exports = TestLog;
