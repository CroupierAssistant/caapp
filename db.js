const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://G0rdonShumway:qweasdzxcwsx89@croupierassistantcluste.pnmla6y.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'croupierassistant' // Добавьте эту строчку
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Ошибка подключения к MongoDB:', error);
});

db.once('open', () => {
  console.log('Подключено к MongoDB');
});

module.exports = db;
