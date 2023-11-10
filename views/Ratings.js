import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RatingButton from "../components/RatingButton";
import RatingsModal from "../components/RatingsModal";

const Ratings = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState([]);
  const games = [
    "Blackjack",
    // "Multiplication",
    // "Roulette Pictures",
    "Roulette series",
    "Neighbours",
    "Russian Poker Ante",
    "Russian Poker 5-bonus",
    "Russian Poker 6-bonus",
    "UTH Blind Bets",
    "UTH Trips Bets",
    "Texas Hold'em",
  ];


  const handlePress = (gameName) => {
    setSelectedGame(gameName);
    setModalVisible(true);

    // fetch(`https://caapp-server.onrender.com/ratings/${gameName}`) // Замените example.com на ваш адрес сервера
    fetch(`http://192.168.31.124:10000/ratings/${gameName}`) // Замените example.com на ваш адрес сервера
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRatings(data); // Предполагается, что данные приходят в формате JSON
      })
      .catch((error) => {
        console.error("Ошибка при получении рейтингов:", error);
      });
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>Ratings</Text>
      <ScrollView
        showsVerticalScrollIndicator={false} style={{backgroundColor: "#fff",  width: "100%"}}
      >
        <View style={{ width: "100%" }}>
          {games.map((game) => (
            <RatingButton key={game} onPress={handlePress} gameName={game} />
          ))}
        </View>
      </ScrollView>
      {selectedGame && (
        <RatingsModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          game={selectedGame}
          ratings={ratings} // Передайте реальные рейтинги с сервера
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff'
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase"
  },
});

export default Ratings;