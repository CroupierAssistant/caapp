import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CardResults = ({
  cardResults,
  timePassedParent,
  mode,
  amountOfCards,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

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
  }, [cardResults]);

  function areAllElementsPresent(arrA, arrB) {
    const setB = new Set(arrB);
    return arrA.length && arrA.every((element) => setB.has(element));
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}%
        {mode === "timelimit" && ` in ${timePassedParent}`}
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
