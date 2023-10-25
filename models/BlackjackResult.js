const mongoose = require("mongoose");

const BlackjackSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  showUserData: Boolean,
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
