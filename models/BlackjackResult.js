const mongoose = require("mongoose");

const BlackjackSchema = new mongoose.Schema({
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
});

const BlackjackResult = mongoose.model("BlackjackResult", BlackjackSchema);

module.exports = BlackjackResult;