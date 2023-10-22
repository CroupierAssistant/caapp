import React, { useContext, useState, useEffect, useRef } from "react";
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
import Stopwatch from "../../../components/Stopwatch";
import saveGameTestResult from "../../../components/saveGameTestResult";
import { AuthContext } from "../../../context/AuthContext";

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
    gameName
  } = route.params;

  
  const { user } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(true);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [timePassedParent, setTimePassedParent] = useState("");
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени

  const [percentageTest, setPercentageTest] = useState(0)

  const flatListRef = useRef(null);

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
    const userId = user && user._id; 
    const game = gameName; 
    const timeTaken = formatTime(timeSpent); 
  
    console.log(userId, game, percentageTest, timeTaken);
  
    // if (userId && game && percentageTest !== 0 && timeTaken !== 0) {
      saveGameTestResult(userId, game, percentageTest, timeTaken)
        .then((response) => {
          if (response.success) {
            console.log(response.message);
          } else {
            console.error(response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    // }
  }, [percentageTest, gameName, user]);

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
        amount = max / st + 1;
      }

      const uniqueNumbers = new Set();
      let attempts = 0;
      const maxAttempts = 10000;

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
    setTimerRunning(true);

    return () => {
      // Здесь можно выполнить дополнительные действия при размонтировании компонента
    };
  }, []);

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

  const updateTimer = (formattedTime) => {
    setTimePassedParent(formattedTime);
  };

  const onTimeUpdate = (time) => {
    setTimeSpent(time);
  };

  return (
    <View style={{ flex: 1 }}>
      {!isDone && (
        <>
          {mode === "timelimit" && (
            <Timer
              time={timeLimit + 1000}
              setIsDone={setIsDone}
              setTimeSpent={setTimeSpent}
            />
          )}

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
              <Text style={{ textAlign: "center" }}>Show paytable</Text>
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
          timeSpent={timeSpent}
          mode={mode}
          amountOfCards={amountOfCards}
          setPercentageTest={setPercentageTest}
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
