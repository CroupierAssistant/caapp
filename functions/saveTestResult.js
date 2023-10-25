import axios from "axios";

const saveTestResult = async (user, amountOfCards, game, mode, percentage, timeSpentTest) => {
  try {
    console.log(user, amountOfCards, game, mode, percentage, timeSpentTest);
    const response = await axios.post(
      'https://caapp-server.onrender.com/saveTestResult',
      {
        user,
        amountOfCards,
        game,
        mode,
        percentage,
        timeSpentTest,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestResult;
