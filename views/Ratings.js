import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import RatingButton from "../components/RatingButton";
import RatingsModal from "../components/RatingsModal";

const Ratings = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState([])
  const games = [
    "Blackjack",
    "Multiplication",
    "Roulette Pictures",
    "Roulette series",
    "Neighbours",
    "Russian poker ante",
    "Russian poker 5-bonus",
    "Russian poker 6-bonus",
    "UTH blind",
    "UTH trips",
    "Texas hold'em",
  ];

  const handlePress = (gameName) => {
    setSelectedGame(gameName);
    setModalVisible(true);
  
    fetch(`https://caapp-server.onrender.com/ratings/${gameName}`) // Замените example.com на ваш адрес сервера
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRatings(data); // Предполагается, что данные приходят в формате JSON
      })
      .catch((error) => {
        console.error('Ошибка при получении рейтингов:', error);
      });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Пример данных рейтингов
  // const ratings = [
  //   { username: "user1", game: 'Blackjack', percentage: 80, timeSpentTest: "00:15.65" },
  //   { username: "user2", game: 'Blackjack', percentage: 75, timeSpentTest: "00:18.32" },
  //   { username: "user3", game: 'Blackjack', percentage: 100, timeSpentTest: "00:15.32" },
  //   { username: "user4user4user4user4user4user4user4", game: 'Blackjack', percentage: 95, timeSpentTest: "00:11.32" },
  //   // ...
  // ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text>Ratings</Text>
        <View>
          {games.map((game) => (
            <RatingButton
              key={game}
              onPress={handlePress}
              gameName={game}
            />
          ))}
        </View>
        {selectedGame && (
          <RatingsModal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            game={selectedGame}
            ratings={ratings} // Передайте реальные рейтинги с сервера
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});

export default Ratings;
