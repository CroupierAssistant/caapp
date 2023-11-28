import axios from "axios";

const saveTestResult = async (
  userId,
  username,
  amountOfCards,
  game,
  mode,
  percentage,
  timeSpentTest,
  showUserData
) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestResult",
      // "https://caapp-server.onrender.com/saveTestResult",
      {
        userId,
        username,
        amountOfCards,
        game,
        mode,
        percentage,
        timeSpentTest,
        showUserData
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestResult;