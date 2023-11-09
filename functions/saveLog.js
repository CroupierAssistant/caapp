import axios from "axios";

const saveLog = async (level, user, message) => {
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveLog",
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

export default saveLog;
