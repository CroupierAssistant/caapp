import axios from "axios";

const saveTestResult = async (
  userId,
  username,
  amountOfCards,
  game,
  mode,
  percentage,
  timeSpentTest,
) => {
  try {
    const response = await axios.post(
      // "https://caapp-server.onrender.com/saveTestResult",
      "http://192.168.31.124:10000/saveTestResult",
      {
        userId,
        username,
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