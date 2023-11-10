const mongoose = require('mongoose');

// Первое подключение
const connectionUser = mongoose.createConnection('mongodb+srv://G0rdonShumway:qweasdzxcwsx89@croupierassistantcluste.pnmla6y.mongodb.net/userDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Обработка ошибок для первого подключения
connectionUser.on('error', (error) => {
  console.error('Ошибка подключения к первой MongoDB базе данных: "userDatabase"', error);
});

// Успешное подключение к первой базе данных
connectionUser.once('open', () => {
  console.log('Подключено MongoDB к базе данных: "userDatabase"');
});

// Второе подключение
const connectionResults = mongoose.createConnection('mongodb+srv://G0rdonShumway:qweasdzxcwsx89@croupierassistantcluste.pnmla6y.mongodb.net/resultsDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Обработка ошибок для второго подключения
connectionResults.on('error', (error) => {
  console.error('Ошибка подключения ко второй MongoDB базе данных: "resultsDatabase"', error);
});

// Успешное подключение ко второй базе данных
connectionResults.once('open', () => {
  console.log('Подключено MongoDB к базе данных: "resultsDatabase"');
});

// Второе подключение
const connectionTests = mongoose.createConnection('mongodb+srv://G0rdonShumway:qweasdzxcwsx89@croupierassistantcluste.pnmla6y.mongodb.net/testsDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Обработка ошибок для второго подключения
connectionTests.on('error', (error) => {
  console.error('Ошибка подключения ко второй MongoDB базе данных: "testsDatabase"', error);
});

// Успешное подключение ко второй базе данных
connectionTests.once('open', () => {
  console.log('Подключено MongoDB к базе данных: "testsDatabase"');
});

// Экспорт подключений
module.exports = { connectionUser, connectionResults, connectionTests };
