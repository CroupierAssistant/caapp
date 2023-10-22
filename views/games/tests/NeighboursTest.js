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
import CardNeighbour from "../../../components/CardNeighbour";
import CardResultsNeigbours from "../../../components/CardResultsNeigbours";
import Timer from "../../../components/Timer";
import Stopwatch from "../../../components/Stopwatch";

function NeighboursTest({ route }) {
  const { mode, amountOfCards, timeLimit, gameName } = route.params;
  const [isDone, setIsDone] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени
  const [showPaytableModal, setShowPaytableModal] = useState(false);

  const flatListRef = useRef(null);

  const openPaytableModal = () => {
    setShowPaytableModal(true);
  };

  const closePaytableModal = () => {
    setShowPaytableModal(false);
  };

  const onTimeUpdate = (time) => {
    setTimeSpent(time);
  };

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
        index: amountOfCards != 37 ? `${i + 1} / ${amountOfCards}` : i + 1,
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
        index:
          amountOfCards != 37
            ? `${index + 1} / ${finalCardData.length}`
            : `${index + 1}`,
      };
    }); // Прописываем новые индексы

    setCardList(finalCardDataWithNewIndices);

    setTimerRunning(true);
  }, []);

  const handleSubmit = (userInput) => {
    setCardResults((prev) => {
      const newResult = {
        cardNumber: cardList[activeCardIndex].numbers[2],
        rightAnswer: cardList[activeCardIndex].numbers,
        userInput: userInput,
      };
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
          // height: Dimensions.get("window").height - 220,
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
          {timerRunning && mode === "timelimit" && (
            <Timer
              time={timeLimit + 1000}
              setIsDone={setIsDone}
              setTimeSpent={setTimeSpent}
            />
          )}

          <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible={showPaytableModal}
            onRequestClose={closePaytableModal}
          >
            <View style={styles.modal}>
              <View
                style={{
                  width: "100%",
                }}
              >
                <Button
                  style={styles.modalButton}
                  title="Close"
                  onPress={closePaytableModal}
                />
              </View>
            </View>
          </Modal>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <TouchableOpacity
              onPress={openPaytableModal}
              style={{
                padding: 5,
                backgroundColor: "#ccc",
                minWidth: 100,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>Show info</Text>
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
          mode={mode}
          amountOfCards={amountOfCards}
          timeSpent={timeSpent}
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

export default NeighboursTest;
