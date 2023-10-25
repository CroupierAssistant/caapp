const mongoose = require('mongoose');

const Russian6bonusSchema = new mongoose.Schema({
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

const Russian6bonusResult = mongoose.model('Russian6bonusResult', Russian6bonusSchema);

module.exports = Russian6bonusResult;