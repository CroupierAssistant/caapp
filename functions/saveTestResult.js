import axios from "axios";

const saveTestResult = async (
  user,
  amountOfCards,
  game,
  mode,
  percentage,
  timeSpentTest,
) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestResult",
      {
        user, // Передаем объект пользователя
        amountOfCards,
        game,
        mode,
        percentage,
        timeSpentTest,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestResult;