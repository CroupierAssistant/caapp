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

function RouletteSeriesTest({ route }) {
  const { timeLimit, mode, amountOfCards, minBet, maxBet, combinations } = route.params;

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
      const bet = round5(getRandomMultipleOfFive(minNumber, randomGame.maxBet));

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
    <View style={{ flex: 1 }}>
      {!isDone && (
        <>
          {timerRunning && mode === "timelimit" && (
            <Timer
              time={timeLimit}
              updateTimer={updateTimer}
              setIsDone={setIsDone}
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
              style={{ padding: 5, backgroundColor: "#ccc", minWidth: 100 }}
            >
              <Text style={{ textAlign: "center" }}>Show info</Text>
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
              <View style={{ width: "100%" }}>
                {mode === "timelimit" && (
                  <Text style={styles.modalInfo}>
                    You need to calculate the payout for {amountOfCards} bets.
                    The time limit is {timeLimit / 1000} seconds. You need to
                    write the maximum denomination of how much the sector plays.
                    Step is 5, maximum is {maxBet} progressive (DON'T WRITE THE
                    REST). You need to do 100% to get to the leaderboard.
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
          />
        </>
      )}
      {isDone && (
        <CardResults
          cardResults={cardResults}
          timePassedParent={timePassedParent}
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

export default RouletteSeriesTest;
