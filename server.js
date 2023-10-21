const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const User = require("./models/User");

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

app.use((req, res, next) => {
  const token = req.headers.authorization; // Предполагается, что токен передается в заголовке

  if (token) {
    jwt.verify(token, 'ваш_секретный_ключ', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Невалидный токен' });
      }
      req.user = user; // Устанавливаем объект пользователя в req
      next(); // Переходим к следующему промежуточному ПО
    });
  } else {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }
});

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

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/'); // Укажите путь, куда сохранять файлы
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Уникальное имя файла
  }
});

const upload = multer({ storage });

app.post('/upload-profile-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const userId = req.user._id; // Предполагается, что вы используете аутентификацию JWT и передаете userId в запросе
    const profilePhotoPath = req.file.path;

    // Здесь вы можете сохранить путь к фотографии в базу данных для данного пользователя
    await User.findByIdAndUpdate(userId, { profilePhoto: profilePhotoPath });

    res.json({ success: 'Фотография профиля успешно загружена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

