import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import CardPicture from "../../../components/CardPicture";
import Keyboard from "../../../components/Keyboard";
import CardResultsPictures from "../../../components/CardResultsPictures";
import Timer from "../../../components/Timer";
import { PICTURE10_PATH } from "../../../components/PICTURE10_PATH";
import { PICTURE20_PATH } from "../../../components/PICTURE20_PATH";
import Stopwatch from "../../../components/Stopwatch";

function RoulettePicturesTest({ route }) {
  const { timeLimit, mode, amountOfCards, combinations, numbers, gameName } =
    route.params;
  const [images, setImages] = useState([]);
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [cardList, setCardList] = useState([]);

  const [modalVisible, setModalVisible] = useState(true);
  const [showPaytableModal, setShowPaytableModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [cardResults, setCardResults] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [timePassedParent, setTimePassedParent] = useState("");
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени

  const flatListRef = useRef(null);

  const handleStopTest = () => {
    setIsDone(true);
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

  const updateTimer = (formattedTime) => {
    setTimePassedParent(formattedTime);
  };

  const handleInputChange = (text) => {
    // setInputValue(text);
    setInputValue(text);

    setCardResults((prev) => {
      const newResult = {
        cardNumber: cardList[activeCardIndex].number,
        rightAnswer: cardList[activeCardIndex].rightAnswer,
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
    const PICTURE_PATHS = [
      ...(combinations.selected10 ? PICTURE10_PATH : []),
      ...(combinations.selected20 ? PICTURE20_PATH : []),
    ];

    const selectedLabels = {
      selected0: "zero",
      selected2: "two",
      selected3: "zeroside",
      selected5: "center",
      selected6: "side",
    };

    const selectedLabelsArray = Object.entries(selectedLabels)
      .filter(([key, value]) => numbers[key])
      .map(([key, value]) => value);

    const cardData = PICTURE_PATHS.filter((item) =>
      selectedLabelsArray.includes(item.label)
    ).map((item, index) => {
      const image = item.image;

      return {
        index:
          amountOfCards > 0 ? `${index + 1} / ${amountOfCards}` : index + 1,
        number: image,
        rightAnswer: item.name.split("_")[1],
      };
    });

    const shuffledCardData = [...cardData].sort(() => Math.random() - 0.5); // Перемешиваем готовый исходник
    const finalCardData = shuffledCardData.slice(0, amountOfCards); // Обрезаем исходник до нужной длины
    const finalCardDataWithNewIndices = finalCardData.map((item, index) => {
      return {
        ...item,
        index: `${index + 1} / ${finalCardData.length}`,
      };
    }); // Прописываем новые индексы

    setCardList(finalCardDataWithNewIndices);
  }, []);

  const renderCardItem = ({ item }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {showActiveCard && (
          <CardPicture index={cardList[activeCardIndex].index}>
            <Image
              style={{ width: 239, height: 254, transform: [{ scale: 0.9 }] }}
              resizeMode={"cover"}
              source={cardList[activeCardIndex].number}
            />
          </CardPicture>
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
              time={timeLimit}
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
        <CardResultsPictures
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

export default RoulettePicturesTest;
