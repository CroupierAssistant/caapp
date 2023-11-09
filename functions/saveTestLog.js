import axios from "axios";

const saveTestLog = async (level, user, game, percentage, time) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestLog",
      {
        level,
        user,
        game,
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
