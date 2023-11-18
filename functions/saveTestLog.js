import axios from "axios";

const saveTestLog = async (level, user, game, amountOfCards, percentage, time) => {
  try {
    const response = await axios.post(
      // "https://caapp-server.onrender.com/saveTestLog",
      "http://192.168.31.124:10000/saveTestLog",
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
