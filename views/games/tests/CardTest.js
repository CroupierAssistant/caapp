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
import Paytable from "../../../components/Paytable";

function CardTest({ route }) {
  const {
    timeLimit,
    mode,
    amountOfCards,
    minBet,
    maxBet,
    step,
    combinations,
    splitCoeff,
  } = route.params;
  const [modalVisible, setModalVisible] = useState(true);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const [showActiveCard, setShowActiveCard] = useState(true); // Добавляем новое состояние
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const [timePassedParent, setTimePassedParent] = useState("");

  const flatListRef = useRef(null);

  const startTimer = () => {
    setModalVisible(false);
    setTimerRunning(true);
  };

  const openPaytableModal = () => {
    setShowPaytableModal(true);
  };
  const handleStopTest = () => {
    setIsDone(true);
  };

  const closePaytableModal = () => {
    setShowPaytableModal(false);
  };

  const handleInputChange = (text) => {
    // setInputValue(text);
    setInputValue(text);

    setCardResults((prev) => {
      const newResult = {
        cardName: cardList[activeCardIndex].title,
        cardNumber: cardList[activeCardIndex].number,
        rightAnswer:
          cardList[activeCardIndex].number * cardList[activeCardIndex].coeff,
        userInput: text,
      };
      return [...prev, newResult];
    });
  };

  const handleSubmit = () => {
    // Переходим к следующей карте
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

  useEffect(() => {
    function generateUniqueRandomNumbers(amount, min, max, st) {
      if (amount === 0) {
        amount = max / st + 1; // Используем максимальное возможное количество чисел
      }

      const uniqueNumbers = new Set();
      let attempts = 0;
      const maxAttempts = 10000; // Максимальное количество попыток

      while (uniqueNumbers.size < amount && attempts < maxAttempts) {
        const randomNum = Math.round(Math.random() * (max - min) + min);
        if (randomNum % st === 0) {
          uniqueNumbers.add(randomNum);
        }
        attempts++;
      }

      return Array.from(uniqueNumbers);
    }

    const cardNumbers = generateUniqueRandomNumbers(
      amountOfCards,
      minBet,
      maxBet,
      step
    );

    const cardData = cardNumbers.map((number, index) => {
      const randomGameIndex = Math.floor(Math.random() * combinations.length);
      const randomGame = combinations[randomGameIndex];

      return {
        title: randomGame.name,
        coeff: randomGame.coeff,
        index:
          amountOfCards > 0 ? `${index + 1} / ${amountOfCards}` : index + 1,
        number,
      };
    });

    setCardList(cardData);

    // Здесь вы можете сохранить cardData в состояние, если это нужно

    return () => {
      // Здесь можно выполнить дополнительные действия при размонтировании компонента
    };
  }, []); // Пустой массив зависимостей, что означает, что этот блок кода выполнится только при загрузке компонента

  const renderCardItem = ({ item }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {showActiveCard && ( // Добавляем проверку, показывать или нет активную карту
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
    <View style={{ flex: 1 }}>
      {!isDone && (
        <>
          <Modal
            animationType="fade"
            presentationStyle="pageSheet"
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            onDismiss={startTimer}
          >
            <View style={styles.modal}>
              <View
                style={{
                  width: "100%",
                }}
              >
                {mode === "timelimit" && (
                  <Text style={styles.modalInfo}>
                    You need to calculate the payout for {amountOfCards} bets.
                    The time limit is {timeLimit / 1000} seconds. You need to do
                    100% to get to the leaderboard.
                  </Text>
                )}
                {mode === "sandbox" && (
                  <Text style={styles.modalInfo}>
                    You need to calculate the payout for as many bets as you
                    can. There is no time limit. Have fun, no one is rushing
                    you.
                  </Text>
                )}

                <Paytable combinations={combinations} splitCoeff={splitCoeff} />

                <Button
                  style={styles.modalButton}
                  title="Start"
                  onPress={startTimer}
                />
              </View>
            </View>
          </Modal>

          {timerRunning && mode === "timelimit" && (
            <Timer
              time={timeLimit}
              setTimePassedParent={setTimePassedParent}
              setIsDone={setIsDone}
            />
          )}

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 5,
              paddingTop: mode === "timelimit" ? 40 : 5,
            }}
          >
            <TouchableOpacity
              onPress={openPaytableModal}
              style={{ padding: 5, backgroundColor: "#ccc", minWidth: 100 }}
            >
              <Text style={{ textAlign: "center" }}>Show paytable</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleStopTest}
              style={{ padding: 5, backgroundColor: "#a16e83", minWidth: 100 }}
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

          <Modal
            animationType="none"
            presentationStyle="formSheet"
            visible={showPaytableModal}
            onRequestClose={closePaytableModal}
          >
            <View style={styles.modal}>
              <View
                style={{
                  width: "100%",
                }}
              >
                <Paytable combinations={combinations} splitCoeff={splitCoeff} />

                <Button
                  style={styles.modalButton}
                  title="Close"
                  onPress={closePaytableModal}
                />
              </View>
            </View>
          </Modal>

          <Keyboard
            onKeyboardPress={handleKeyboardPress}
            handleInputChange={handleInputChange}
          />
        </>
      )}
      {isDone && (
        <CardResults
          cardResults={cardResults}
          timePassedParent={timePassedParent}
          mode={mode}
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

export default CardTest;
