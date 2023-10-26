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

// Пример использования:
const user = await findUserById('653a111b2341505563da67b0'); // Подставьте сюда действительный идентификатор пользователя
console.log(user); // Выведет объект пользователя, а не промис