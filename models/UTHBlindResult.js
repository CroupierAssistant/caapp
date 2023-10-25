const mongoose = require("mongoose");

const UTHBlindSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Это указывает на модель, с которой у вас есть отношение
  },
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

const UTHBlindResult = mongoose.model("UTHBlindResult", UTHBlindSchema);

module.exports = UTHBlindResult;
