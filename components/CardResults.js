import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

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
      <Text style={styles.header}>
        Test Results: {Number(percentage).toFixed(2)}%
        {mode === "timelimit" && ` in ${timePassedParent}`}
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
                  item.userInput == item.rightAnswer ? "#4caf50" : "#f44336",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                borderBottomWidth: 2,
                borderBottomColor: "#607d8b",
              }}
            >
              Bet: {item.cardNumber}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Right answer: {item.rightAnswer}
            </Text>
            <Text style={{ fontSize: 18 }}>Your answer: {item.userInput}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default CardResults;
