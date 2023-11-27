const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const { User, findUserById } = require("./models/User");
const ActionLog = require("./models/ActionLog");
const TestLog = require("./models/TestLog");
const DuelModel = require("./models/DuelModel");

const BlackjackResult = require("./models/BlackjackResult"); // Import the TestResult model
const MultiplicationResult = require("./models/MultiplicationResult"); // Import the TestResult model
const NeighboursResult = require("./models/NeighboursResult"); // Import the TestResult model
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

app.post("/verifyToken", (req, res) => {
  const { authToken } = req.body;

  if (!authToken) {
    return res
      .status(400)
      .json({ valid: false, message: "Токен не предоставлен" });
  }

  try {
    // Проверяем токен
    const decoded = jwt.verify(authToken, "snyOtnE6JCZXhO72ZdtQ3QhrFQKqiBX6"); // Замените 'your-secret-key' на ваш секретный ключ

    // Если токен действителен
    return res.json({ valid: true, user: decoded.user }); // Опционально: возвращаем информацию о пользователе
  } catch (error) {
    return res
      .status(401)
      .json({ valid: false, message: "Недействительный токен" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, firstName, lastName, email, password, agree } = req.body;

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
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      "snyOtnE6JCZXhO72ZdtQ3QhrFQKqiBX6"
    );

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

    const token = jwt.sign(
      { userId: user._id },
      "snyOtnE6JCZXhO72ZdtQ3QhrFQKqiBX6"
    );
    return res.json({ success: "Авторизация успешна", user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/saveTestResult", async (req, res) => {
  try {
    const {
      userId,
      username,
      amountOfCards,
      game,
      mode,
      percentage,
      timeSpentTest,
    } = req.body;

    if (!username || !game || !mode || !timeSpentTest) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const ModelSchema =
      game === "Blackjack"
        ? BlackjackResult
        : game === "Multiplication"
        ? MultiplicationResult
        : game === "Neighbours"
        ? NeighboursResult
        : game === "Roulette pictures"
        ? RoulettePicturesResult
        : game === "Roulette series"
        ? RouletteSeriesResult
        : game === "Russian Poker 5-bonus"
        ? Russian5bonusResult
        : game === "Russian Poker 6-bonus"
        ? Russian6bonusResult
        : game === "Russian Poker Ante"
        ? RussianAnteResult
        : game === "UTH Blind Bets"
        ? UTHBlindResult
        : game === "UTH Trips Bets"
        ? UTHTripsResult
        : TexasHoldemResult;

    // Поиск существующей записи для пользователя
    const existingResult = await ModelSchema.findOne({ userId, amountOfCards});

    if (!existingResult) {
      // Если записи нет, создаем новую запись
      const newTestResult = await ModelSchema.create({
        userId,
        username,
        amountOfCards,
        game,
        mode,
        percentage,
        timeSpentTest,
      });

      return res.json({
        success: "Test result saved successfully",
        testResult: newTestResult,
      });
    }

    // Если запись существует, проверяем значения percentage и timeSpentTest
    if (existingResult.percentage < percentage) {
      // Если новый процент лучше, обновляем запись
      existingResult.percentage = percentage;
      existingResult.timeSpentTest = timeSpentTest;
      await existingResult.save();

      return res.json({
        success: "Updated test result",
        testResult: existingResult,
      });
    } else if (existingResult.percentage === percentage && existingResult.timeSpentTest > timeSpentTest) {
      // Если проценты равны, но время лучше, обновляем запись
      existingResult.timeSpentTest = timeSpentTest;
      await existingResult.save();

      return res.json({
        success: "Updated test result",
        testResult: existingResult,
      });
    }

    // Если текущая запись лучше или равна существующей, ничего не меняем
    return res.json({
      message: "No changes made to test result",
      testResult: existingResult,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/saveActionLog", async (req, res) => {
  try {
    const { level, user, message } = req.body;

    const newLog = await ActionLog.create({ level, user, message });

    return res.json({
      success: "Log saved successfully",
      log: newLog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/saveTestLog", async (req, res) => {
  try {
    const { level, user, game, amountOfCards, percentage, time } = req.body;

    const newLog = await TestLog.create({
      level,
      user,
      game,
      amountOfCards,
      percentage,
      time,
    });

    return res.json({
      success: "Log saved successfully",
      log: newLog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/ratings/:gameName", async (req, res) => {
  const { gameName } = req.params;

  let resultModel;

  // Определите модель по имени игры
  switch (gameName) {
    case "Blackjack":
      resultModel = BlackjackResult;
      break;
    case "Multiplication":
      resultModel = MultiplicationResult;
      break;
    case "Neighbours":
      resultModel = NeighboursResult;
      break;
    case "Roulette pictures":
      resultModel = RoulettePicturesResult;
      break;
    case "Roulette series":
      resultModel = RouletteSeriesResult;
      break;
    case "Russian Poker 5-bonus":
      resultModel = Russian5bonusResult;
      break;
    case "Russian Poker 6-bonus":
      resultModel = Russian6bonusResult;
      break;
    case "Russian Poker Ante":
      resultModel = RussianAnteResult;
      break;
    case "UTH Blind Bets":
      resultModel = UTHBlindResult;
      break;
    case "UTH Trips Bets":
      resultModel = UTHTripsResult;
      break;
    case "Texas Hold'em":
      resultModel = TexasHoldemResult;
      break;
    // Добавьте другие игры по аналогии
    default:
      return res.status(404).json({ message: "Игра не найдена" });
  }

  try {
    const ratings = await resultModel
      .find({
        game: gameName,
        mode: { $ne: "sandbox" },
        username: { $ne: "/guest/" },
      })
      .select(
        "userId username percentage timeSpentTest firstName lastName amountOfCards showUserData"
      );

    res.json(ratings);
  } catch (error) {
    console.error("Ошибка при получении рейтингов:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

app.get("/userExists", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    const userExists = !!user;
    res.json({ exists: userExists });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при проверке пользователя" });
  }
});

app.get("/emailExists", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });
    const emailExists = !!user;
    res.json({ exists: emailExists });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Произошла ошибка при проверке адреса почты" });
  }
});

app.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await findUserById(userId);
    res.json(user);
  } catch (error) {
    console.error("Ошибка при поиске пользователя:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post("/change-settings", async (req, res) => {
  const {
    username,
    currentPassword,
    newPassword,
    showUserData,
    keyboardPosition,
  } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.json({ success: false, message: "User not found" });
      return;
    }

    if (currentPassword && newPassword) {
      if (!(await comparePassword(currentPassword, user.password))) {
        res.json({ success: false, message: "Incorrect current password" });
        return;
      }

      const hashedPassword = await hashPassword(newPassword);
      user.password = hashedPassword;
    }
    user.showUserData = showUserData;
    user.keyboardPosition = keyboardPosition;

    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/update-profile", async (req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    experience,
    birthday,
  } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.json({ success: false, message: "User not found" });
      return;
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.experience = experience;
    user.birthday = birthday;

    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Маршрут для получения списка всех пользователей
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      "username firstName lastName showUserData"
    );
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users.", error: error.message });
  }
});

// Маршрут для поиска пользователей по username, firstname или lastname
app.get("/searchUsers", async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find(
      {
        $or: [
          { username: { $regex: query, $options: "i" } },
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      },
      "username firstName lastName showUserData"
    );

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching users.", error: error.message });
  }
});

app.get("/myFavorites/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "favorites",
      "username firstName lastName"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching favorites.", error: error.message });
  }
});

// Эндпоинт для добавления друга
app.post("/addFavorites", async (req, res) => {
  const { userId, userFriendId } = req.body;

  try {
    const user = await User.findById(userId);
    const userFavorites = await User.findById(userFriendId);

    if (!user || !userFavorites) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.favorites.includes(userFriendId)) {
      user.favorites.push(userFriendId);
      await user.save();
    }

    res.status(200).json({ message: "Added to favorites successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to favorites.", error: error.message });
  }
});

// Эндпоинт для удаления друга
app.post("/removeFavorites", async (req, res) => {
  const { userId, userFriendId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || !userFriendId) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    // Удаление друга из списка друзей текущего пользователя
    user.favorites.pull(userFriendId);
    await user.save();

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing friend.", error: error.message });
  }
});

// Эндпоинт для отправки запроса duelist'у
app.post("/sendTestRequest", async (req, res) => {
  const {
    username,
    duelistId,
    gameName,
    amountOfCards,
    sender,
    cards,
    timeSpent,
    calculatedPercentage,
    isDuel,
    timeLimit,
  } = req.body;

  try {
    const newDuel = new DuelModel({
      username,
      duelistId,
      game: gameName,
      amountOfCards,
      sender, // Передаем отправителя
      cards,
      timeSpent,
      percentage: calculatedPercentage,
      isDuel,
      timeLimit,
      timestamp: Date.now(),
    });

    await newDuel.save();

    res.status(200).json({ message: "Test request sent to duelist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send test request to duelist" });
  }
});

app.post("/sendRespondResults", async (req, res) => {
  const {
    reciever,
    duelId
  } = req.body;

  try {
    const duel = await DuelModel.findById(duelId); // Находим дуэль по ее идентификатору

    if (!duel) {
      return res.status(404).json({ message: 'Duel not found' });
    }

    // Обновляем свойство reciever у найденной дуэли
    duel.reciever = reciever;
    await duel.save(); // Сохраняем изменения

    res.status(200).json({ message: 'Reciever updated successfully' });
  } catch (error) {
    console.error('Error updating reciever:', error);
    res.status(500).json({ error: 'Failed to update reciever' });
  }
});

// Поиск по базе данных duelsDatabase
app.get('/duelDefense/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const duels = await DuelModel.find({ duelistId: username });
    res.status(200).json(duels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching duels by user ID', error: error.message });
  }
});
app.get('/duelAttack/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const duels = await DuelModel.find({ username: username });
    res.status(200).json(duels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching duels by user ID', error: error.message });
  }
});


const PORT = 10000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
