import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import Timer from "../../../components/Timer";
import Card from "../../../components/Card";
import Keyboard from "../../../components/Keyboard";
import CardResults from "../../../components/CardResults";
import { useNavigation } from "@react-navigation/native";
import Stopwatch from "../../../components/Stopwatch";

function MultiplicationTableTest({ route }) {
  const { timeLimit, mode, amountOfCards, minBet, maxBet, combinations, gameName } =
    route.params;

  const [modalVisible, setModalVisible] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [timePassedParent, setTimePassedParent] = useState("");
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени
  const flatListRef = useRef(null);

  const onTimeUpdate = (time) => {
    setTimeSpent(time);
  };
  
  const startTimer = () => {
    setModalVisible(false);
    setTimerRunning(true);
  };

  const handleStopTest = () => {
    setIsDone(true);
  };

  const handleInputChange = (text) => {
    setCardResults((prev) => {
      const newResult = {
        cardName: cardList[activeCardIndex].title,
        cardNumber: cardList[activeCardIndex].number,
        rightAnswer:
          cardList[activeCardIndex].bet * cardList[activeCardIndex].coeff,
        userInput: text,
      };
      return [...prev, newResult];
    });
  };

  const handleSubmit = () => {
    if (activeCardIndex < cardList.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setShowActiveCard(false);
      setIsDone(true);
    }
    setInputValue("");
  };

  const handleKeyboardPress = (key) => {
    if (key === "submit") {
      handleSubmit();
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    function generateUniqueRandomNumbers(amount, min, max, st) {
      if (amount === 0) {
        amount = 500;
      }

      const uniqueNumbers = new Array();
      let attempts = 0;
      const maxAttempts = 10000;

      while (uniqueNumbers.length < amount && attempts < maxAttempts) {
        const randomNum = Math.round(Math.random() * (max - min) + min);
        if (randomNum % st === 0) {
          uniqueNumbers.push(randomNum);
        }
        attempts++;
      }

      return Array.from(uniqueNumbers);
    }

    const cardNumbers = generateUniqueRandomNumbers(
      amountOfCards,
      minBet,
      maxBet,
      minBet
    );

    const cardData = cardNumbers.map((number, index) => {
      // Фильтруем combinations, оставляем только выбранные
      const selectedCombinations = combinations.filter(
        (combination) => combination.selected
      );

      if (selectedCombinations.length === 0) {
        // Если нет выбранных комбинаций, перейти назад в стеке навигации
        navigation.popToTop();
        return;
      }

      // Генерируем случайный индекс из отфильтрованных комбинаций
      const randomGameIndex = Math.floor(
        Math.random() * selectedCombinations.length
      );
      const randomGame = selectedCombinations[randomGameIndex];

      return {
        coeff: randomGame.coeff,
        bet: number,
        index:
          amountOfCards > 0 ? `${index + 1} / ${amountOfCards}` : index + 1,
        number: (
          <Text>
            {randomGame.coeff} <Text>&times;</Text> {number}
          </Text>
        ),
      };
    });

    setCardList(cardData);
  }, []);

  const renderCardItem = ({ item }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {showActiveCard && (
          <Card
            title={cardList[activeCardIndex].title}
            number={cardList[activeCardIndex].number}
            index={cardList[activeCardIndex].index}
            onSubmit={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", }}>
      {!isDone && (
        <>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <TouchableOpacity
              style={{
                minWidth: 100,
              }}
            >
              <Text style={{ textAlign: "center" }}> </Text>
            </TouchableOpacity>

            {mode === "sandbox" && <Stopwatch onTimeUpdate={onTimeUpdate} />}

            <TouchableOpacity
              onPress={handleStopTest}
              style={{
                padding: 5,
                backgroundColor: "#a16e83",
                minWidth: 100,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Stop</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            horizontal
            data={cardList}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.index.toString()}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            pagingEnabled={true}
          />

          <Keyboard
            onKeyboardPress={handleKeyboardPress}
            handleInputChange={handleInputChange}
            mode={mode}
          />
        </>
      )}
      {isDone && (
        <CardResults
          cardResults={cardResults}
          timeSpent={timeSpent}
          mode={mode}
          amountOfCards={amountOfCards}
          gameName={gameName}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  modalInfo: {
    marginBottom: 50,
  },
  modalButton: {
    width: "100%",
    marginTop: 50,
  },
});

export default MultiplicationTableTest;
