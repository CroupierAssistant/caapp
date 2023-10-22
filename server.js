const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require("./models/User");
const GameTestResult = require("./models/GameTestResult");

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

app.post('/saveGameTestResult', async (req, res) => {
  const { userName, game, percentage, timeTaken } = req.body;

  console.log(req.body);

  const newTest = await GameTestResult.create({
    userName: userName,
    game: game,
    percentage: percentage, 
    timeTaken: timeTaken
  });

  try {
    // const response = await saveGameTestResult(userId, game, percentage, timeTaken);
    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

