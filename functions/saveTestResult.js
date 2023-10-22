import axios from 'axios';

const saveTestResult = async (username, game, percentage, timeSpent) => {
  try {
    const response = await axios.post('https://caapp-server.onrender.com/saveTestResult', {
      username,
      game,
      percentage,
      timeSpent,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestResult;