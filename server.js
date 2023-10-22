const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require("./models/User");

const BlackJackResult = require("./models/BlackJackResult"); // Import the TestResult model
const MultiplicationResult = require("./models/MultiplicationResult"); // Import the TestResult model
const NeighbourResult = require("./models/NeighbourResult"); // Import the TestResult model
const RoulettePicturesResult = require("./models/RoulettePicturesResult"); // Import the TestResult model
const RouletteSeriesResult = require("./models/RouletteSeriesResult"); // Import the TestResult model
const Russian5bonusResult = require("./models/Russian5bonusResult"); // Import the TestResult model
const Russian6bonusResult = require("./models/Russian6bonusResult"); // Import the TestResult model
const RussianAnteResult = require("./models/RussianAnteResult"); // Import the TestResult model
const TexasHoldemResult = require("./models/TexasHoldemResult"); // Import the TestResult model
const UTHBlindResult = require("./models/UTHBlindResult"); // Import the TestResult model
const UTHTripsResult = require("./models/UTHTripsResult"); // Import the TestResult model


const app = express();

app.use(cors());
app.use(bodyParser.json());

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(inputPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
}

app.post("/register", async (req, res) => {
  try {
    const { username, email, password, agree } = req.body;

    // Проверка на обязательные поля
    if (!username || !email || !password || !agree) {
      return res.status(400).json({ error: "Заполните все обязательные поля" });
    }

    // Проверка уникальности имени пользователя и почты
    const isUsernameTaken = await User.exists({ username });
    const isEmailTaken = await User.exists({ email });

    if (isUsernameTaken || isEmailTaken) {
      return res
        .status(400)
        .json({ error: "Имя пользователя или почта уже заняты" });
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password);

    // Создание нового пользователя
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, 'ваш_секретный_ключ');

    return res.json({ success: "Регистрация успешна", user: newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка на обязательные поля
    if (!username || !password) {
      return res.status(400).json({ error: "Заполните все обязательные поля" });
    }

    // Поиск пользователя по имени пользователя
    const user = await User.findOne({ username });

    if (!user || !(await comparePassword(password, user.password))) {
      return res
        .status(401)
        .json({ error: "Неверные имя пользователя или пароль" });
    }

    const token = jwt.sign({ userId: user._id }, 'ваш_секретный_ключ');
    return res.json({ success: "Авторизация успешна", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/saveTestResult", async (req, res) => {
  try {
    const { username, game, mode, percentage, timeSpentTest } = req.body;

    if (!username || !game || !mode || !timeSpentTest) {return res.status(400).json({ error: "Please provide all required fields" })}

    const ModelSchema = 
      game === 'Blackjack' ? BlackJackResult : 
      game === 'Multiplication' ? MultiplicationResult : 
      game === 'Neighbours' ? NeighbourResult : 
      game === 'Roulette pictures' ? RoulettePicturesResult : 
      game === 'Roulette series' ? RouletteSeriesResult : 
      game === 'Russian Poker 5-bonus' ? Russian5bonusResult : 
      game === 'Russian Poker 6-bonus' ? Russian6bonusResult : 
      game === 'Russian Poker Ante' ? RussianAnteResult : 
      game === 'UTH Blind Bets' ? UTHBlindResult : 
      game === 'UTH Trips Bets' ? UTHTripsResult : TexasHoldemResult

    const newTestResult = await ModelSchema.create({username, game, mode, percentage, timeSpentTest});

    return res.json({ success: "Test result saved successfully", testResult: newTestResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

