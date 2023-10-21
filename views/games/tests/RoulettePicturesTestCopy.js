import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, Dimensions } from "react-native";
import CardPicture from "../../../components/CardPictureCopy";
import RoulettePicturesCenter from "../RoulettePictures/RoulettePicturesCenter";
import RoulettePicturesSide from "../RoulettePictures/RoulettePicturesSide";
import RoulettePicturesTwo from "../RoulettePictures/RoulettePicturesTwo";
import RoulettePicturesZero from "../RoulettePictures/RoulettePicturesZero";
import RoulettePicturesZeroSide from "../RoulettePictures/RoulettePicturesZeroSide";
import Keyboard from "../../../components/Keyboard";
import CardResultsPictures from "../../../components/CardResultsPictures";

// Определяем компонент RoulettePictures
function RoulettePicturesTest() {
  const [payouts, setPayouts] = useState([]);

  const handleAddPayout = (payout) => {
    setPayouts([...payouts, 'payout']);
    // setPayouts([...payouts, payout]);
    
    console.log(payouts);
  };

  // Здесь вы можете подготовить данные, которые будут переданы в FlatList
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardResults, setCardResults] = useState([]);
  const [timePassedParent, setTimePassedParent] = useState("");
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0); // Добавляем состояние времени

  const mode = "sandbox";
  const amountOfCards = 5;

  const flatListRef = useRef(null);

  useEffect(() => {
    const rouletteComponents = [
      // RoulettePicturesCenter,
      // RoulettePicturesSide,
      // RoulettePicturesTwo,
      // RoulettePicturesZero,
      RoulettePicturesZeroSide,
    ];

    function RandomComponent() {
      const randomIndex = Math.floor(Math.random() * rouletteComponents.length);
      const RandomComponent = rouletteComponents[randomIndex];

      return <RandomComponent handleAddPayout={handleAddPayout} />;
    }

    const cardData = [];

    for (let i = 0; i <= amountOfCards; i++) {
      cardData.push({
        index: i + 1,
        component: RandomComponent(),
      });
    }

    setCardList(cardData);
  }, []);

  const renderCardItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {showActiveCard && (
          <CardPicture
            key={cardList[index].index}
            index={cardList[activeCardIndex].index}
          >
            {cardList[activeCardIndex].component}
          </CardPicture>
        )}
      </View>
    );
  };

  const handleKeyboardPress = (key) => {
    if (key === "submit") {
      handleSubmit();
    }
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

  return (
    <View style={{ flex: 1 }}>
      {!isDone && (
        <>
          {timerRunning && mode === "timelimit" && (
            <Timer time={timeLimit + 1000} setIsDone={setIsDone} setTimeSpent={setTimeSpent}/>
          )}
          <FlatList
            ref={flatListRef}
            data={cardList}
            renderItem={renderCardItem}
            keyExtractor={(item) => item.index.toString()}
            horizontal // Включаем горизонтальное отображение
            showsHorizontalScrollIndicator={false} // Если вам не нужны индикаторы прокрутки
            // scrollEnabled={false} // Опционально: можете отключить прокрутку
            pagingEnabled={true} // Опционально: можете включить пейджинг
          />
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
          payouts={payouts}
        />
      )}
    </View>
  );
}

export default RoulettePicturesTest;
