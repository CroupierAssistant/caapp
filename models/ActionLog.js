const mongoose = require("mongoose");
const { connectionUser } = require('../db');

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

const ActionLog = connectionUser.model("ActionLog", LogSchema);

module.exports = ActionLog
