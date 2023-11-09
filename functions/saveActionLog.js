import axios from "axios";

const saveActionLog = async (level, user, message) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveActionLog",
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
