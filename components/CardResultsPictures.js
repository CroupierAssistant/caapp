import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import CardResultsPicturesItem from "./CardResultPicturesItem";
import saveTestResult from "../functions/saveTestResult";
import { AuthContext } from "../context/AuthContext";

const CardResultsPictures = ({ cardResults, timeSpent, mode, amountOfCards, gameName }) => {

  const [percentage, setPercentage] = useState(0);
  const [rightAnswersAmount, setRightAnswersAmount] = useState(0);
  
  const { user } = useContext(AuthContext);

  const handleSaveTestResult = async ({userId, nickname, amountOfCards, game, type, percent, time}) => {

    try {
      const response = await saveTestResult(userId, nickname, amountOfCards, game, type, percent, time);
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

    const calculatedPercentage = (correctAnswers * 100) / amountOfCards;
    setRightAnswersAmount(correctAnswers);
    setPercentage(calculatedPercentage);

    handleSaveTestResult({
      userId: user && user._id ? user._id : '',
      nickname: user && user.username ? user.username : '\/guest\/',
      amountOfCards: amountOfCards,
      game: gameName,
      type: mode,
      percent: calculatedPercentage,
      time: timeSpent
    })

  }, [cardResults]);

  const renderCardItem = ({ item }) => {
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
        {mode === "timelimit" && ` in ${formatTime(timeSpent)}`}
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
