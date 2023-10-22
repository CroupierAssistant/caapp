import Axios from "axios";

const saveGameTestResult = (userName, game, percentage, timeTaken) => {
  return Axios.post("https://caapp-server.onrender.com/saveGameTestResult", {
    userName,
    game,
    percentage,
    timeTaken,
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error(error);
    return { success: false, message: "Ошибка при сохранении результата" };
  });
};

export default saveGameTestResult;