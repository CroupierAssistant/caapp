import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import saveTestResult from "../functions/saveTestResult";
import { AuthContext } from "../context/AuthContext";


const CardResults = ({ cardResults, timeSpent, mode, amountOfCards, gameName }) => {
  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  
  const { user } = useContext(AuthContext);

  const handleSaveTestResult = async ({nickname, game, percent, time}) => {

    try {
      const response = await saveTestResult(nickname, game, percent, time);
      console.log(response);
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

    const calculatedPercentage = (correctAnswers * 100) / (mode == 'timelimit' ? amountOfCards : cardResults.length);
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);

    console.log(user.username, gameName, calculatedPercentage, timeSpent);

    handleSaveTestResult({
      nickname: user.username,
      game: gameName,
      percent: calculatedPercentage,
      time: formatTime(timeSpent)
    })
    
  }, [cardResults]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}% {` in ${formatTime(timeSpent)}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} / {(mode == 'timelimit' ? amountOfCards : cardResults.length)}
      </Text>
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
              <Ionicons name="close-sharp" style={styles.icon} size={40} color="#fff" />
            )}
            {item.userInput == item.rightAnswer && (
              <Ionicons name="checkmark-sharp" style={styles.icon} size={40} color="#fff" />
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
