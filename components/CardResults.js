import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const CardResults = ({ cardResults, timePassedParent, mode }) => {
  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

  useEffect(() => {
    let correctAnswers = 0;

    cardResults.forEach((card) => {
      if (card.rightAnswer == card.userInput) {
        correctAnswers++;
      }
    });

    const calculatedPercentage = (correctAnswers * 100) / cardResults.length;
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);
  }, [cardResults]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}%
        {mode === "timelimit" && ` in ${timePassedParent}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} / {cardResults.length}
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
