import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import saveTestResult from "../functions/saveTestResult";
import saveTestLog from "../functions/saveTestLog";
import axios from "axios";

const CardResults = ({
  cardResults,
  timeSpent,
  mode,
  amountOfCards,
  gameName,
  isDuel,
  duelist,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

  const { user } = useContext(AuthContext);

  const handleSaveTestResult = async ({
    userId,
    nickname,
    cards,
    game,
    type,
    percent,
    time,
  }) => {
    try {
      const response = await saveTestResult(
        userId,
        nickname,
        cards,
        game,
        type,
        percent,
        time
      );
      await saveTestLog(type, nickname, game, cards, percent, time);

      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.round((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(ms).padStart(2, "0")}`;
  };

  useEffect(() => {
    let correctAnswers = 0;

    cardResults.forEach((card) => {
      if (card.rightAnswer == card.userInput) {
        correctAnswers++;
      }
    });

    const calculatedPercentage =
      (correctAnswers * 100) /
      (mode == "timelimit" ? amountOfCards : cardResults.length);
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);

    handleSaveTestResult({
      userId: user && user._id ? user._id : "",
      nickname: user && user.username ? user.username : "/guest/",
      cards: mode == "timelimit" ? amountOfCards : cardResults.length,
      game: gameName,
      type: mode,
      percent: calculatedPercentage,
      time: timeSpent,
    });

    handleTestCompletion()
  }, [cardResults]);

  // Функция для отправки запроса на прохождение теста duelist'у
  const sendTestResultsToDuelist = async () => {
    try {
      const response = await axios.post("https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/sendTestRequest", {
        username: user.username,
        duelistId: duelist._id,
        cardResults,
        timeSpent,
        mode,
        amountOfCards,
        gameName,
      });

      if (response.status === 200) {
        // Результаты успешно отправлены
      } else {
        // Обработка ошибок при отправке
      }
    } catch (error) {
      console.error("Error sending test results:", error);
      // Обработка ошибок при отправке запроса
    }
  };

  // Функция, вызываемая после прохождения теста для сохранения результатов и отправки запроса duelist'у
  const handleTestCompletion = async () => {
    if (isDuel && duelist) {
      try {
        await sendTestResultsToDuelist(
          cardResults,
          timeSpent,
          mode,
          amountOfCards,
          gameName,
          isDuel,
          duelist,
        );
        // Обработка успешного сохранения результатов и отправки запроса
        // Можете показать уведомление или выполнить другие действия
      } catch (error) {
        // Обработка ошибок при сохранении результатов и отправке запроса
        console.error(error);
        // Показать уведомление об ошибке или выполнить другие действия
      }
    }
  };

  return (
    <View style={{ ...styles.container, paddingBottom: isDuel ? 50 : 0 }}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}%{" "}
        {` in ${formatTime(timeSpent)}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} /{" "}
        {mode == "timelimit" ? amountOfCards : cardResults.length}
      </Text>

      {isDuel && duelist && (
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginBottom: 10,
            fontStyle: "italic",
          }}
        >
          {duelist.username} will recieve your challenge
        </Text>
      )}

      <FlatList
        data={cardResults}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.resultItem,
              {
                backgroundColor:
                  item.userInput == item.rightAnswer ? "#3c7c49" : "#a6334d",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                lineHeight: 20,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#fff",
              }}
            >
              {item.cardName ? item.cardName + " " : ""}
              {item.cardNumber} = {item.rightAnswer}
            </Text>
            {/* <Text style={{ fontSize: 16, color: "#fff", lineHeight: 16 }}>
              Right answer: {item.rightAnswer}
            </Text> */}
            <Text style={{ fontSize: 16, color: "#fff", lineHeight: 16 }}>
              Your answer: {item.userInput ? item.userInput : "—"}
            </Text>
            {item.userInput != item.rightAnswer && (
              <Ionicons
                name="close-sharp"
                style={styles.icon}
                size={40}
                color="#fff"
              />
            )}
            {item.userInput == item.rightAnswer && (
              <Ionicons
                name="checkmark-sharp"
                style={styles.icon}
                size={40}
                color="#fff"
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    padding: 10,
    elevation: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#19181a",
  },
  resultItem: {
    marginBottom: 5,
    padding: 10,
    borderRadius: 3,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 5,
  },
});

export default CardResults;
