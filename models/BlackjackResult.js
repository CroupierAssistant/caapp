const mongoose = require("mongoose");

const BlackjackSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlackjackResult = mongoose.model("BlackjackResult", BlackjackSchema);

module.exports = BlackjackResult;
