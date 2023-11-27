import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DuelModal = ({ isShowGameList, selectedDuelist, onClose, user }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(10);
  const [selectedGame, setSelectedGame] = useState(null);
  const [timeLimit, setTimeLimit] = useState(0);
  const [combinations, setСombinations] = useState([]);
  const games = [
    "Blackjack",
    "Roulette series",
    "Russian Poker Ante",
    "Russian Poker 5-bonus",
    "Russian Poker 6-bonus",
    "UTH Blind Bets",
    "UTH Trips Bets",
    "Texas Hold'em",
  ];

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  useEffect(() => {
    setTimeLimit(
      selectedGame === "Blackjack"
        ? Number(activeTab) * 6000
        : Number(activeTab) * 9000
    );

    let combinations = [];

    switch (selectedGame) {
      case "Blackjack":
        combinations = [{ name: "Blackjack", coeff: 1.5 }];
        break;
      case "Russian Poker Ante":
        combinations = [
          {
            name: "Pair",
            coeff: 2,
          },
          {
            name: "Two Pair",
            coeff: 4,
          },
          {
            name: "Three of a kind",
            coeff: 6,
          },
          {
            name: "Straight",
            coeff: 8,
          },
          {
            name: "Flush",
            coeff: 10,
          },
          {
            name: "Full house",
            coeff: 14,
          },
          {
            name: "Four of a kind",
            coeff: 40,
          },
          {
            name: "Straight flush",
            coeff: 100,
          },
          {
            name: "Royal flush",
            coeff: 200,
          },
        ];
        break;
      case "Russian Poker 5-bonus":
        combinations = [
          {
            name: "Straight",
            coeff: 25,
          },
          {
            name: "Flush",
            coeff: 50,
          },
          {
            name: "Full house",
            coeff: 100,
          },
          {
            name: "Four of a kind",
            coeff: 300,
          },
          {
            name: "Straight flush",
            coeff: 500,
          },
          {
            name: "Royal flush",
            coeff: 1000,
          },
        ];
        break;
      case "Russian Poker 6-bonus":
        combinations = [
          {
            name: "Straight",
            coeff: 8,
          },
          {
            name: "Flush",
            coeff: 15,
          },
          {
            name: "Full house",
            coeff: 30,
          },
          {
            name: "Four of a kind",
            coeff: 100,
          },
          {
            name: "Straight flush",
            coeff: 150,
          },
          {
            name: "Royal flush",
            coeff: 300,
          },
        ];
        break;
      case "UTH Blind Bets":
        combinations = [
          {
            name: "Straight",
            coeff: 1,
          },
          {
            name: "Flush",
            coeff: 1.5,
          },
          {
            name: "Full house",
            coeff: 3,
          },
          {
            name: "Four of a kind",
            coeff: 10,
          },
          {
            name: "Straight flush",
            coeff: 50,
          },
          {
            name: "Royal flush",
            coeff: 500,
          },
        ];
        break;
      case "UTH Trips Bets":
        combinations = [
          {
            name: "Three of a kind",
            coeff: 3,
          },
          {
            name: "Straight",
            coeff: 4,
          },
          {
            name: "Flush",
            coeff: 7,
          },
          {
            name: "Full house",
            coeff: 8,
          },
          {
            name: "Four of a kind",
            coeff: 30,
          },
          {
            name: "Straight flush",
            coeff: 40,
          },
          {
            name: "Royal flush",
            coeff: 50,
          },
        ];
        break;
      case "Texas Hold'em":
        combinations = [
          {
            name: "Straight",
            coeff: 7,
          },
          {
            name: "Flush",
            coeff: 20,
          },
          {
            name: "Full house",
            coeff: 30,
          },
          {
            name: "Four of a kind",
            coeff: 40,
          },
          {
            name: "Straight flush",
            coeff: 50,
          },
          {
            name: "Royal flush",
            coeff: 100,
          },
        ];
        break;
      case "Roulette series":
        combinations = [
          {
            name: "Voisins de zero",
            maxBet: 50 * 17,
            critical: 50 * 13.5,
            coefficientBeforeCritical: 9,
            coefficientAfterCritical: 7,
          },
          {
            name: "Zero spiel",
            maxBet: 50 * 7,
            critical: 50 * 4,
            coefficientBeforeCritical: 4,
            coefficientAfterCritical: 3,
          },
          {
            name: "Orphelins",
            maxBet: 50 * 9,
            critical: 50 * 5,
            coefficientBeforeCritical: 5,
            coefficientAfterCritical: 4,
          },
          {
            name: "Tier",
            maxBet: 50 * 12,
            critical: 50 * 12,
            coefficientBeforeCritical: 6,
            coefficientAfterCritical: 6,
          },
        ];
        break;
      default:
        break;
    }

    setСombinations(combinations);
  }, [selectedGame, activeTab]);

  const handleNavigationToDuel = async () => {
    const duelOptions = await {
      mode: "timeLimit",
      amountOfCards: Number(activeTab),
      minBet: 5,
      maxBet: selectedGame === "Roulette series" ? 50 : 500,
      step: 5,
      timeLimit: timeLimit,
      splitCoeff: selectedGame === "Russian Poker Ante" ? true : false,
      combinations: combinations,
      gameName: selectedGame,
      isDuel: true,
      duelist: selectedDuelist ? selectedDuelist : null,
    };

    navigation.navigate("Tests", {
      screen:
        selectedGame === "Roulette series" ? "RouletteSeriesTest" : "CardTest",
      params: duelOptions,
    });
  };

  return (
    <Modal visible={isShowGameList} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {!selectedGame && (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#29648a",
                  marginBottom: -5,
                }}
              >
                Challenge
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  marginBottom: 10,
                  color: "#29648a",
                  fontWeight: "bold",
                }}
              >
                {selectedDuelist.username}
              </Text>

              <View style={styles.tabs}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 10 ? styles.activeTab : null,
                  ]}
                  onPress={() => setActiveTab(10)}
                >
                  <Text style={styles.tabText}>10 Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 20 ? styles.activeTab : null,
                  ]}
                  onPress={() => setActiveTab(20)}
                >
                  <Text style={styles.tabText}>20 Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === 30 ? styles.activeTab : null,
                  ]}
                  onPress={() => setActiveTab(30)}
                >
                  <Text style={styles.tabText}>30 Cards</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderWidth: 2,
                  flex: 1,
                  borderColor: "#29648a",
                  padding: 5,
                  borderBottomLeftRadius: 3,
                  borderBottomRightRadius: 3,
                }}
              >
                <ScrollView style={{flex: 1}}>
                {games.map((game, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    style={[
                      styles.userItem,
                      { borderTopWidth: index === 0 ? 0 : 1 }, // Убрать верхнюю границу для первого элемента
                      { borderBottomWidth: index === games.length - 1 ? 0 : 1 }, // Убрать нижнюю границу для последнего элемента
                    ]}
                    onPress={() => handleGameSelect(game)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.username}>{game}</Text>
                    </View>
                  </TouchableOpacity>
                ))}</ScrollView>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
          {selectedGame && (
            <>
              <View
                style={{
                  borderWidth: 2,
                  flex: 1,
                  borderColor: "#29648a",
                  padding: 5,
                  borderRadius: 3,
                }}
              >
                <>
                  <View style={styles.duelistContainer}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        color: "#29648a",
                        marginBottom: -5,
                      }}
                    >
                      You are challenging
                    </Text>
                    <Text style={styles.duelistName}>
                      {selectedDuelist.username}
                    </Text>
                    <View style={styles.gameInfo}>
                      <View style={styles.gameInfoRow}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#29648a",
                            fontWeight: "bold",
                          }}
                        >
                          Challenge type:{" "}
                        </Text>
                        <Text style={{ fontSize: 16, color: "#29648a" }}>
                          {selectedGame}
                        </Text>
                      </View>
                      <View style={styles.gameInfoRow}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#29648a",
                            fontWeight: "bold",
                          }}
                        >
                          Amount of cards:{" "}
                        </Text>
                        <Text style={{ fontSize: 16, color: "#29648a" }}>
                          {activeTab}
                        </Text>
                      </View>
                      <View style={styles.gameInfoRow}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#29648a",
                            fontWeight: "bold",
                          }}
                        >
                          Time limit:{" "}
                        </Text>
                        <Text style={{ fontSize: 16, color: "#29648a" }}>
                          {timeLimit / 1000} seconds
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      color: "#29648a",
                    }}
                  >
                    The user will receive your challenge request as soon as you
                    complete the test
                  </Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={{
                        ...styles.startButton,
                        backgroundColor: !user ? "#555" : "#a16e83",
                      }}
                      onPress={() => setSelectedGame(null)}
                    >
                      <Text style={styles.startButtonText}>cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={handleNavigationToDuel}
                    >
                      <Text style={styles.startButtonText}>start</Text>
                    </TouchableOpacity>
                  </View>
                </>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gameInfo: {
    marginTop: 20,
  },
  gameInfoRow: {
    flexDirection: "row",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 3,
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.8,
  },
  closeButton: {
    alignSelf: "center",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#29648a", // Цвет кнопки закрытия
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
    borderBottomColor: "#29648a",
    // borderBottomWidth: 2,
    gap: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "#C0C0C0",
  },
  activeTab: {
    backgroundColor: "#29648a", // Цвет активной вкладки
  },
  tabText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
  },
  userItem: {
    width: "100%",
    height: 54,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#29648a",
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#008486",
    borderRadius: 3,
    width: "49%",
  },
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
    marginBottom: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 5,
  },
  duelistName: {
    fontSize: 30,
    color: "#29648a",
    fontWeight: "bold",
  },
  duelistContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
});

export default DuelModal;
