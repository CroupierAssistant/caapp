const mongoose = require("mongoose");
const { connectionResults } = require('../db');

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
  showUserData: Boolean,
});

const BlackjackResult = connectionResults.model("BlackjackResult", BlackjackSchema);

module.exports = BlackjackResult;