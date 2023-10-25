const mongoose = require('mongoose');

const RussianAnteSchema = new mongoose.Schema({
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

const RussianAnteResult = mongoose.model('RussianAnteResult', RussianAnteSchema);

module.exports = RussianAnteResult;