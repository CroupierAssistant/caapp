import axios from "axios";

const saveTestLog = async (level, user, game, amountOfCards, percentage, time) => {
  try {
    const response = await axios.post(
      // "https://caapp-server.onrender.com/saveTestLog",
      "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/saveTestLog",
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
