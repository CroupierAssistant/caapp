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
      "https://caapp-server.onrender.com/saveTestResult",
      // "https://10000-croupierassistan-caapp-08t6zzqrh2x.ws-us106.gitpod.io/saveTestResult",
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