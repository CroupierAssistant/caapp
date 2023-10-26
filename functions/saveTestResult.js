import axios from "axios";
import mongoose from 'mongoose';

const saveTestResult = async (userId, username, firstName, lastName, amountOfCards, game, mode, percentage, timeSpentTest, showUserData,) => {
  console.log(userId, username, firstName, lastName, amountOfCards, game, mode, percentage, timeSpentTest, showUserData);
  try {
    const response = await axios.post(
      "https://caapp-server.onrender.com/saveTestResult",
      {
        userId: userId, username, firstName, lastName, amountOfCards, game, mode, percentage, timeSpentTest, showUserData,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default saveTestResult;