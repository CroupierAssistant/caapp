const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

const ActionLog = mongoose.model("ActionLog", logSchema);

module.exports = ActionLog
