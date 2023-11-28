import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import saveTestResult from "../functions/saveTestResult";
import saveTestLog from "../functions/saveTestLog";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const CardResults = ({
  cardResults,
  timeSpent,
  mode,
  amountOfCards,
  gameName,
  isDuel,
  duelist,
  isRespond,
  duelId,
  timeLimit,
}) => {
  const navigation = useNavigation();
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
      (mode == "timeLimit" ? amountOfCards : cardResults.length);
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);

    if (!isDuel) {
      handleSaveTestResult({
        userId: user && user._id ? user._id : "",
        nickname: user && user.username ? user.username : "/guest/",
        cards: mode == "timeLimit" ? amountOfCards : cardResults.length,
        game: gameName,
        type: mode,
        percent: calculatedPercentage,
        time: timeSpent,
        showUserData: user && user.showUserData ? user.showUserData : false
      });
    }

    const sendResults = async (percentage) => {
      try {
        const cleanedCardResults = cardResults.map(({ userInput, ...rest }) => rest);
  
        const response = await axios.post(
          "https://caapp-server.onrender.com/sendTestRequest",
          {
            username: user.username,
            duelistId: duelist.username,
            gameName,
            amountOfCards,
            sender: [{ username: user.username, timeSpent, percentage }, ...cardResults],
            cards: cleanedCardResults,
            isDuel,
            timeLimit,
          }
        );
  
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

    const sendRespondResults = async (percentage) => {
      try {
        const response = await axios.post(
          "https://caapp-server.onrender.com/sendRespondResults",
          {
            reciever: [{ username: user.username, timeSpent, percentage }, ...cardResults],
            duelId,
          }
        );
  
        if (response.status === 200) {
          
        } else {
          // Обработка ошибок при отправке
        }
      } catch (error) {
        console.error("Error sending test results:", error);
        // Обработка ошибок при отправке запроса
      }
    };
  
    if (isDuel && duelist) {
      sendResults(calculatedPercentage);
    }
    if (isRespond) {
      sendRespondResults(calculatedPercentage)
    }

  }, [cardResults]);


  return (
    <View style={{ ...styles.container, paddingBottom: isDuel ? 50 : 0 }}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}%{" "}
        {` in ${formatTime(timeSpent)}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} /{" "}
        {mode == "timeLimit" ? amountOfCards : cardResults.length}
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
