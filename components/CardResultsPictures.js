import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CardResultsPicturesItem from "./CardResultPicturesItem";
import { PicturesContext } from "../context/PicturesContext";

const CardResultsPictures = ({ cardResults, timePassedParent, mode, amountOfCards }) => {
  // const {payouts, handleAddPayout} = useContext(PicturesContext)

  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);

  useEffect(() => {
    let correctAnswers = 0;

    cardResults.forEach((card) => {
      if (card.rightAnswer == card.userInput) {
        correctAnswers++;
      }
    });

    const calculatedPercentage = (correctAnswers * 100) / amountOfCards;
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);

  }, [cardResults]);

  const renderCardItem = ({ item }) => {
    // const image = require(`../../../assets/images/pictures/${item.number}`);
    return (
      <View style={[styles.resultItem, {backgroundColor: item.userInput == item.rightAnswer ? "#3c7c49" : "#a6334d"}]}>
        <CardResultsPicturesItem item={item}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { lineHeight: 22 }]}>
        Test Results: {percentage ? Number(percentage).toFixed(2) : "0"}%
        {mode === "timelimit" && ` in ${timePassedParent}`}
      </Text>
      <Text style={[styles.header, { fontSize: 20, lineHeight: 20 }]}>
        Correct answers: {rightAnswersAmount} / {amountOfCards}
      </Text>
      <FlatList
        data={cardResults}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderCardItem}
        scrollEnabled={true}
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
});

export default CardResultsPictures;
