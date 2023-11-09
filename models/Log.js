const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);

const saveLog = async (level, user, message) => {
  const log = new Log({ level, user, message });
  await log.save();
};

module.exports = { Log, saveLog };
