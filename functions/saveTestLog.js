import axios from "axios";

const saveTestLog = async (level, user, game, amountOfCards, percentage, time) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestLog",
      // "https://10000-croupierassistan-caapp-08t6zzqrh2x.ws-us106.gitpod.io/saveTestLog",
      {
        level,
        user,
        game,
        amountOfCards,
        percentage,
        time,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestLog;
