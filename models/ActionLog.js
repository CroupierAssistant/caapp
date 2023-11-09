const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

const ActionLog = mongoose.model("ActionLog", LogSchema);

module.exports = ActionLog
