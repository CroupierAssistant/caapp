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
        Test Results: {percentage ? Number(percentage).toFixed(2) : '0'}%
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
                  item.userInput == item.rightAnswer ? "#66cc6a" : "#f55c51",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 5,
                color: '#444',
              }}
            >
              {item.cardName} - {item.cardNumber}
            </Text>
            <Text style={{ fontSize: 18, color: '#444' }}>
              Right answer: {item.rightAnswer}
            </Text>
            <Text style={{ fontSize: 18, color: '#444' }}>Your answer: {item.userInput ? item.userInput : '—'}</Text>
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
    elevation: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: '#444',
    textTransform: 'uppercase',
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default CardResults;
