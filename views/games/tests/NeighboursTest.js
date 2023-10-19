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
import CardNeighbour from "../../../components/CardNeighbour";
import Keyboard from "../../../components/Keyboard";
import CardResultsNeigbours from "../../../components/CardResultsNeigbours";
import { useNavigation } from "@react-navigation/native";

function NeighboursTest({ route }) {
  const { timeLimit, mode, amountOfCards } = route.params;
  const [isDone, setIsDone] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [timePassedParent, setTimePassedParent] = useState("");

  const flatListRef = useRef(null);

  const TRACK = [
    3, 26, 0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
    10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0,
    32,
  ];

  useEffect(() => {
    const cardData = [];

    for (let i = 0; i < TRACK.length - 4; i++) {
      const cardNumbers = TRACK.slice(i, i + 5);
      const otherNumbers = [
        ...TRACK.slice(5, i),
        ...TRACK.slice(i + 5, TRACK.length - 6),
      ];

      const card = {
        index: `${i + 1}`,
        numbers: cardNumbers,
        otherNumbers: otherNumbers,
      };

      cardData.push(card);
    }

    const shuffledCardData = [...cardData].sort(() => Math.random() - 0.5); // Перемешиваем готовый исходник
    const finalCardData = shuffledCardData.slice(
      0,
      amountOfCards == 0 ? TRACK.length : amountOfCards
    ); // Обрезаем исходник до нужной длины
    const finalCardDataWithNewIndices = finalCardData.map((item, index) => {
      return {
        ...item,
        index: `${index + 1} / ${finalCardData.length}`,
      };
    }); // Прописываем новые индексы

    console.log(finalCardDataWithNewIndices);

    setCardList(finalCardDataWithNewIndices);
  }, []);

  const handleSubmit = (userInput) => {
    setCardResults((prev) => {
      const newResult = {
        cardNumber: cardList[activeCardIndex].numbers[2],
        rightAnswer: cardList[activeCardIndex].numbers,
        userInput: userInput,
      };
      console.log(newResult);
      return [...prev, newResult];
    });

    // Переходим к следующей карте
    if (activeCardIndex < cardList.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setShowActiveCard(false);
      setIsDone(true);
    }
    setInputValue("");
  };

  const handleStopTest = () => {
    setIsDone(true);
  };

  const renderCardItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 220,
        }}
      >
        {showActiveCard && ( // Добавляем проверку, показывать или нет активную карту
          <CardNeighbour
            number={cardList[activeCardIndex].numbers}
            index={cardList[activeCardIndex].index}
            otherNumbers={cardList[activeCardIndex].otherNumbers}
            onSubmit={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
              onPress={handleStopTest}
              style={{ padding: 5, backgroundColor: "#a16e83", minWidth: 100 }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Stop</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
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
          </View>
        </>
      )}
      {isDone && (
        <CardResultsNeigbours
          cardResults={cardResults}
        //   timePassedParent={timePassedParent}
          mode={mode}
          amountOfCards={amountOfCards}
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

export default NeighboursTest;
