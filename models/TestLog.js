const mongoose = require("mongoose");

const TestLogSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  game: String,
  percentage: Number,
  time: String,
  timestamp: { type: Date, default: Date.now },
});

const TestLog = mongoose.model("TestLog", TestLogSchema);

module.exports = TestLog;
