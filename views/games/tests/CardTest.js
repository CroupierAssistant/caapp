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
import Stopwatch from "../../../components/Stopwatch";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

function CardTest({ route }) {
  const navigation = useNavigation();
  
  const {
    timeLimit,
    mode,
    amountOfCards,
    minBet,
    maxBet,
    step,
    combinations,
    splitCoeff,
    gameName,
    isDuel,
    duelist,
    duelId,
    cardsDuel,
    isRespond,
  } = route.params;

  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени

  const flatListRef = useRef(null);

  const openPaytableModal = () => {
    setShowPaytableModal(true);
  };
  const handleStopTest = async () => {
    await setIsDone(true);
  };

  const closePaytableModal = () => {
    setShowPaytableModal(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);

    setCardResults((prev) => {
      const newResult = {
        cardName: cardList[activeCardIndex].title,
        cardNumber: cardList[activeCardIndex].number,
        rightAnswer: cardList[activeCardIndex].rightAnswer
          ? cardList[activeCardIndex].rightAnswer
          : cardList[activeCardIndex].number * cardList[activeCardIndex].coeff,
        userInput: text,
      };
      return [...prev, newResult];
    });
  };

  useEffect(() => {
    if (isDone) {
      const newResults = cardList.map((card) => {
        const isCardIncluded = cardResults.some(
          (result) =>
            result.cardName === card.title &&
            result.cardNumber === card.number &&
            result.rightAnswer ===
              (card.rightAnswer ? card.rightAnswer : card.number * card.coeff)
        );
  
        if (isCardIncluded) {
          return null; // Если карта уже есть в cardResults, вернем null
        } else {
          return {
            cardName: card.title,
            cardNumber: card.number,
            rightAnswer: card.rightAnswer
              ? card.rightAnswer
              : card.number * card.coeff,
            userInput: "",
          };
        }
      }).filter((result) => result !== null); // Убираем все null из новых результатов
  
      setCardResults((prev) => [...prev, ...newResults]);
      navigation.navigate('Tests')
      setShowActiveCard(false);
      setShowResult(true)
    }
  }, [isDone]);

  const handleSubmit = () => {
    // Переходим к следующей карте
    if (activeCardIndex < cardList.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setShowActiveCard(false);
      setIsDone(true);
      if (isDuel) navigation.navigate('Tests')
    }
    setInputValue("");
  };

  const handleSkipCard = () => {
    setCardList((prevList) => {
      const newList = [...prevList];
      const skippedCard = newList.splice(activeCardIndex, 1)[0];
      newList.push(skippedCard);
      return newList;
    });
  };

  const handleKeyboardPress = (key) => {
    if (key === "submit") {
      handleSubmit();
    } else if (key === "skip") {
      // напиши логику
      // нужно переносить активную карту в конец очереди
      handleSkipCard();
    }
  };

  useEffect(() => {
    if (!cardsDuel) {
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
    } else {
      const cardData = cardsDuel.map((card, index) => {
        return {
          title: card.cardName,
          rightAnswer: card.rightAnswer,
          index:
            amountOfCards > 0 ? `${index + 1} / ${amountOfCards}` : index + 1,
          number: card.cardNumber,
        };
      });
      setCardList(cardData);
    }

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

  const onTimeUpdate = (time) => {
    setTimeSpent(time);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {!isDone && (
        <>
          {mode === "timeLimit" && (
            <Timer
              time={timeLimit}
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
            mode={mode}
          />
        </>
      )}
      {isDone && showResult && (
        <CardResults
          cardResults={cardResults}
          timeSpent={timeSpent}
          amountOfCards={amountOfCards}
          gameName={gameName}
          mode={mode}
          isDuel={isDuel}
          duelist={duelist}
          isRespond={isRespond}
          duelId={duelId}
          timeLimit={timeLimit}
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
