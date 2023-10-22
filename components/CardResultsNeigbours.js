import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import saveTestResult from "../functions/saveTestResult";
import { AuthContext } from "../context/AuthContext";

const CardResults = ({ cardResults, timeSpent, mode, amountOfCards, gameName }) => {
  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  
  const { user } = useContext(AuthContext);

  const handleSaveTestResult = async ({nickname, game, type, percent, time}) => {

    try {
      const response = await saveTestResult(nickname, game, type, percent, time);
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
      if (areAllElementsPresent(card.userInput, card.rightAnswer)) {
        correctAnswers++;
      }
    });

    const calculatedPercentage =
      (correctAnswers * 100) /
      (mode == "timelimit" ? amountOfCards : cardResults.length);
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);
    
    handleSaveTestResult({
      nickname: user.username,
      game: gameName,
      type: mode,
      percent: calculatedPercentage,
      time: formatTime(timeSpent)
    })
  }, [cardResults]);

  function areAllElementsPresent(arrA, arrB) {
    const setB = new Set(arrB);
    return arrA.length && arrA.every((element) => setB.has(element));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}% {` in ${formatTime(timeSpent)}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} /{" "}
        {mode == "timelimit" ? amountOfCards : cardResults.length}
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
                backgroundColor: areAllElementsPresent(item.userInput, item.rightAnswer)
                  ? "#3c7c49"
                  : "#a6334d",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 24,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#fff",
                verticalAlign: 'middle'
              }}
            >
              {`${item.rightAnswer[0]} ${item.rightAnswer[1]}`} 
              <Text style={{ fontSize: 24, color: "#fff"}}> {item.cardNumber} </Text>
              {`${item.rightAnswer[3]} ${item.rightAnswer[4]}`}
            </Text>
            <Text style={{ fontSize: 16, color: "#fff", lineHeight: 16 }}>
              Your answer:{" "}
              {item.userInput && item.userInput.length == 4
                ? item.userInput.join(" ")
                : "—"}
            </Text>
            {areAllElementsPresent(item.userInput, item.rightAnswer) ? (
              <Ionicons
                name="checkmark-sharp"
                style={styles.icon}
                size={40}
                color="#fff"
              />
            ) : (
              <Ionicons
                name="close-sharp"
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
