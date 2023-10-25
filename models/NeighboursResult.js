const mongoose = require('mongoose');

const NeighboursSchema = new mongoose.Schema({
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

const NeighboursResult = mongoose.model('NeighboursResult', NeighboursSchema);

module.exports = NeighboursResult;