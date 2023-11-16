const mongoose = require("mongoose");
const { connectionDuels } = require('../db');

const cardSchema = new mongoose.Schema({
  cardName: String,
  cardNumber: Number,
  rightAnswer: Number,
  userInput: String,
});

const DuelSchema = new mongoose.Schema({
  username: String,
  duelistId: mongoose.Schema.Types.ObjectId,
  game: String,
  amountOfCards: Number,
  cardResults: [cardSchema],
  timestamp: { type: Date, default: Date.now },
});

const DuelModel = connectionDuels.model("Duel", DuelSchema);

module.exports = DuelModel;
