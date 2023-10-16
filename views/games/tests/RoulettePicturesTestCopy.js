import React, { useState, useRef, useEffect } from "react";
import { FlatList, View, Dimensions } from "react-native";
import CardPicture from "../../../components/CardPictureCopy";
import RoulettePicturesCenter from "../RoulettePictures/RoulettePicturesCenter";
import RoulettePicturesSide from "../RoulettePictures/RoulettePicturesSide";
import RoulettePicturesTwo from "../RoulettePictures/RoulettePicturesTwo";
import RoulettePicturesZero from "../RoulettePictures/RoulettePicturesZero";
import RoulettePicturesZeroSide from "../RoulettePictures/RoulettePicturesZeroSide";
import Keyboard from "../../../components/Keyboard";

// Определяем компонент RoulettePictures
function RoulettePicturesTest() {
  // Здесь вы можете подготовить данные, которые будут переданы в FlatList
  const [showActiveCard, setShowActiveCard] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [cardList, setCardList] = useState([]);

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

      return <RandomComponent />;
    }

    const cardData = [];

    for (let i = 0; i < 50; i++) {
      cardData.push({ index: i + 1, component: RandomComponent() });
    }

    setCardList(cardData);
  }, []);

  const renderCardItem = ({ item }) => {
    return (
      <View style={{flex: 1, width: Dimensions.get("window").width / 5}}>
        {showActiveCard && (
          <CardPicture index={item.index}>{item.component}</CardPicture>
        )}
      </View>
    );
  };

  const handleSubmit = () => {
    const newIndex = activeCardIndex + 1;
    setActiveCardIndex(newIndex);

    if (newIndex < cardList.length - 1) {
      flatListRef.current.scrollToIndex({
        animated: false,
        index: newIndex,
      });
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

  const handleInputChange = (text) => {
    console.log("ok");
  };

  return (
    <View style={{ 
      backgroundColor: "#29648a57",flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={cardList}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.index.toString()}
        horizontal // Включаем горизонтальное отображение
        // showsHorizontalScrollIndicator={false} // Если вам не нужны индикаторы прокрутки
        // scrollEnabled={false} // Опционально: можете отключить прокрутку
        pagingEnabled={true} // Опционально: можете включить пейджинг
      />
      {/* <Keyboard
        onKeyboardPress={handleKeyboardPress}
        handleInputChange={handleInputChange}
      /> */}
    </View>
  );
}

export default RoulettePicturesTest;
