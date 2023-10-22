const axios = require('axios');

async function saveGameTestResult(userId, game, percentage, timeTaken) {
  try {
    const response = await axios.post('https://caapp-server.onrender.com/saveGameTestResult', {
      userId,
      game,
      percentage,
      timeTaken,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Ошибка при сохранении результата' };
  }
}

module.exports = saveGameTestResult;
