import axios from "axios";

const saveTestResult = async (
  username,
  firstName,
  lastName,
  amountOfCards,
  game,
  mode,
  percentage,
  timeSpentTest
) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestResult",
      {
        username,
        firstName,
        lastName,
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
