const mongoose = require("mongoose");

const BlackjackSchema = new mongoose.Schema({
  userId: String,
  username: String,
  lastName: String,
  firstName: String,
  amountOfCards: Number,
  game: String,
  mode: String,
  percentage: Number,
  timeSpentTest: Number,
  showUserData: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

const BlackjackResult = mongoose.model("BlackjackResult", BlackjackSchema);

module.exports = BlackjackResult;