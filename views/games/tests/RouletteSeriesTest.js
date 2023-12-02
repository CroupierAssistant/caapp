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
import Stopwatch from "../../../components/Stopwatch";
import { useNavigation } from "@react-navigation/native";

function RouletteSeriesTest({ route }) {
  const navigation = useNavigation();
  const {
    timeLimit,
    mode,
    amountOfCards,
    minBet,
    maxBet,
    combinations,
    gameName,
    isDuel,
    duelist,
    duelId,
    cardsDuel,
    isRespond,
  } = route.params;

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
  const flatListRef = useRef(null);
  const [percentageTest, setPercentageTest] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startTimer = () => {
    setModalVisible(false);
    setTimerRunning(true);
  };

  const handleStopTest = () => {
    setIsDone(true);
    setShowResult(true)
  };

  const openPaytableModal = () => {
    setShowPaytableModal(true);
  };

  const onTimeUpdate = (time) => {
    setTimeSpent(time);
  };

  const closePaytableModal = () => {
    setShowPaytableModal(false);
  };

  const handleInputChange = (text) => {
    setCardResults((prev) => {
      const sector = cardList[activeCardIndex];
      const bet = cardList[activeCardIndex].number;

      let playsBy;
      let playsByBefore;
      let playsByAfter;

      if (bet <= sector.critical) {
        playsBy = round5(bet / sector.coefficientBeforeCritical);
      } else {
        playsByBefore = sector.critical / sector.coefficientBeforeCritical;
        playsByAfter =
          (bet - sector.critical) / sector.coefficientAfterCritical;
        playsBy = round5(playsByAfter + playsByBefore);
      }

      const newResult = {
        cardName: cardList[activeCardIndex].title,
        cardNumber: cardList[activeCardIndex].number,
        rightAnswer: playsBy < maxBet * 2 ? playsBy : maxBet * 2,
        userInput: text,
      };
      return [...prev, newResult];
    });
  };

  useEffect(() => {
    if (isDone) {
      const newResults = cardList
        .map((card) => {
          
          const sector = card;
          const bet = card.number;

          let playsBy;
          let playsByBefore;
          let playsByAfter;

          if (bet <= sector.critical) {
            playsBy = round5(bet / sector.coefficientBeforeCritical);
          } else {
            playsByBefore =
              sector.critical / sector.coefficientBeforeCritical;
            playsByAfter =
              (bet - sector.critical) / sector.coefficientAfterCritical;
            playsBy = round5(playsByAfter + playsByBefore);
          }

          const isCardIncluded = cardResults.some(
            (result) =>
              result.cardName === card.title &&
              result.cardNumber === card.number &&
              result.rightAnswer ===
                (card.rightAnswer ? card.rightAnswer : (playsBy < maxBet * 2 ? playsBy : maxBet * 2))
          );

          if (isCardIncluded) {
            return null; // Если карта уже есть в cardResults, вернем null
          } else {

            return {
              cardName: card.title,
              cardNumber: card.number,
              rightAnswer: playsBy < maxBet * 2 ? playsBy : maxBet * 2,
              userInput: "",
            };
          }
        })
        .filter((result) => result !== null); // Убираем все null из новых результатов

      setCardResults((prev) => [...prev, ...newResults]);
      navigation.navigate('Tests')
      setShowActiveCard(false);
      setShowResult(true);
    }
  }, [isDone]);

  const handleSubmit = () => {
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

  const round5 = (x) => {
    return x % 5 >= 4.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
  };

  function getRandomMultipleOfFive(minNumber, maxBet) {
    const minMultipleOfFive = Math.ceil(minNumber / 5) * 5;
    const maxMultipleOfFive = Math.floor(maxBet / 5) * 5;
    return getRandomIntInclusive(minMultipleOfFive, maxMultipleOfFive);
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
        5
      );

      const cardData = cardNumbers.map((number, index) => {
        const randomGameIndex = Math.floor(Math.random() * combinations.length);
        const randomGame = combinations[randomGameIndex];

        const minNumber =
          Number(minBet) * Number(randomGame.coefficientBeforeCritical);
        const bet = round5(
          getRandomMultipleOfFive(minNumber, randomGame.maxBet)
        );

        return {
          title: randomGame.name,
          maxBet: randomGame.maxBet,
          critical: randomGame.critical,
          coefficientBeforeCritical: randomGame.coefficientBeforeCritical,
          coefficientAfterCritical: randomGame.coefficientAfterCritical,
          index:
            amountOfCards > 0 ? `${index + 1} / ${amountOfCards}` : index + 1,
          number: bet,
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

  const updateTimer = (formattedTime) => {
    setTimePassedParent(formattedTime);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {!isDone && (
        <>
          {timerRunning && mode === "timeLimit" && (
            <Timer
              time={timeLimit}
              setIsDone={setIsDone}
              isDone={isDone}
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
              <View style={{ width: "100%" }}>
                {mode === "timeLimit" && (
                  <Text style={styles.modalInfo}>
                    The goal is to calculate the payout for {amountOfCards}{" "}
                    bets. The time limit is {timeLimit / 1000} seconds. Specify
                    the highest denomination for the sector's payout (DO NOT
                    WRITE THE REST). The step is 5, with a maximum progressive
                    of 50.
                  </Text>
                )}
                {mode === "sandbox" && (
                  <Text style={styles.modalInfo}>
                    You need to calculate the payout for as many bets as you
                    can. There is no time limit. Have fun, no one is rushing
                    you. Step is 5, maximum is {maxBet} progressive (DON'T WRITE
                    THE REST)
                  </Text>
                )}
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
          mode={mode}
          amountOfCards={amountOfCards}
          gameName={gameName}
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

export default RouletteSeriesTest;
