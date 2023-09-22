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

function BlackjackTest({ route, navigation }) {
  const { mode, amountOfCards, minBet, maxBet, step } = route.params;
  const [modalVisible, setModalVisible] = useState(true);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const [showActiveCard, setShowActiveCard] = useState(true); // Добавляем новое состояние
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false, // Скрыть нижнюю навигацию
    });

    // Когда компонент размонтируется, вернуть видимость нижней навигации
    return () => {
      navigation.setOptions({
        tabBarVisible: true,
      });
    };
  }, []);

  const startTimer = () => {
    setModalVisible(false);
    setTimerRunning(true);
  };

  const openPaytableModal = () => {
    setShowPaytableModal(true);
  };

  const closePaytableModal = () => {
    setShowPaytableModal(false);
  };

  function generateUniqueRandomNumbers(amount, min, max) {
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < amount) {
      const randomNum = Math.ceil(Math.random() * (max - min) + min);
      if (randomNum % 5 === 0) {
        uniqueNumbers.add(randomNum);
      }
    }

    return Array.from(uniqueNumbers);
  }

  const cardNumbers = generateUniqueRandomNumbers(amountOfCards, 5, 500);

  const cardData = cardNumbers.map((number, index) => ({
    title: `Blackjack`,
    number,
    index: `${index + 1} / ${amountOfCards}`,
  }));

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    // Здесь можно обработать введенное значение, если нужно
    // Например, сохранить его или выполнить какую-то логику

    // Переходим к следующей карте
    if (activeCardIndex < cardData.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
    } else {
      setShowActiveCard(false); // Если достигнут конец, скрываем активную карту
    }

    // Очищаем поле ввода
    setInputValue("");
  };

  const handleKeyboardPress = (key) => {
    if (key === "submit") {
      handleSubmit();
    }
    // Добавьте обработку других кнопок клавиатуры по необходимости
  };

  const renderCardItem = ({ item }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {showActiveCard && ( // Добавляем проверку, показывать или нет активную карту
          <Card
            title={cardData[activeCardIndex].title}
            number={cardData[activeCardIndex].number}
            index={cardData[activeCardIndex].index}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        presentationStyle="formSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modal}>
          <View>
            <Text style={styles.modalInfo}>
              You need to calculate the payout for {amountOfCards} bets. The
              time limit is 60 seconds. You need to do 100% to get to the
              leaderboard.
            </Text>
            <Button
              style={styles.modalButton}
              title="Start Timer"
              onPress={startTimer}
            />
          </View>
        </View>
      </Modal>

      {timerRunning && mode === "timelimit" && <Timer time={60000} />}

      <TouchableOpacity onPress={openPaytableModal}>
        <Text>Show paytable</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        horizontal
        data={cardData}
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
          <View>
            <Text style={styles.modalInfo}>Paytable Information</Text>
            <Button
              style={styles.modalButton}
              title="Close"
              onPress={closePaytableModal}
            />
          </View>
        </View>
      </Modal>

      <Keyboard onKeyboardPress={handleKeyboardPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalInfo: {
    marginBottom: 50,
  },
  modalButton: {
    width: "100%",
  },
});

export default BlackjackTest;
