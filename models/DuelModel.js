const mongoose = require("mongoose");
const { connectionDuels } = require('../db');

const cardSchema = new mongoose.Schema({
  username: String,
  cardName: String,
  cardNumber: Number,
  rightAnswer: Number,
  userInput: String,
  timeSpent: Number,
  percentage: Number,
});

const DuelSchema = new mongoose.Schema({
  username: String,
  duelistId: mongoose.Schema.Types.ObjectId,
  game: String,
  amountOfCards: Number,
  sender: [cardSchema],
  reciever: [cardSchema],
  cards: [cardSchema],
  timestamp: { type: Date, default: Date.now },
  isDuel: Boolean,
  timeLimit: Number
});

const DuelModel = connectionDuels.model("Duel", DuelSchema);

module.exports = DuelModel;
