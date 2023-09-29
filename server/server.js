// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb+srv://G0rdonShumway:qweasdzxcwsx89@croupierassistantcluste.pnmla6y.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Модель пользователя
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: String,
}));

// Функция для создания токена
function createToken(user) {
  return jwt.sign({ id: user.id }, 'your_secret_key', {
    expiresIn: '1h',
  });
}

// Регистрация пользователя
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Hashed Password:', hash);
        }
      });
    const user = new User({ username, password: hashedPassword });
    await user.save();
    const token = createToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while registering the user.');
  }
});

// Вход пользователя
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid credentials.');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send('Invalid credentials.');
    }
    const token = createToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while logging in.');
  }
});

// Защищенный маршрут, требующий аутентификации
app.get('/protected', (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
