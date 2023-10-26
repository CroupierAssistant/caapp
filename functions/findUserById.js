import axios from "axios";

const findUserById = async (userId) => {
    try {
      const response = await axios.get(`https://caapp-server.onrender.com/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при поиске пользователя:', error);
      throw error;
    }
  };
  
export default findUserById;
