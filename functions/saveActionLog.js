import axios from "axios";

const saveActionLog = async (level, user, message) => {
  try {
    const response = await axios.post(
      // "https://caapp-server.onrender.com/saveActionLog",
      "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/saveActionLog",
      {
        level,
        user,
        message,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveActionLog;
