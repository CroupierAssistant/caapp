import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Loader from "./Loader";

function DuelAll() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [duels, setDuels] = useState([]);
  const [isDuel, setIsDuel] = useState(null);
  const [selectedDuel, setSelectedDuel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleModalToDuel = (duel) => {
    setSelectedDuel(duel);
    setIsDuel((prev) => !prev);
  };

  const handleNavigationToDuel = async (duel) => {
    const duelOptions = await {
      amountOfCards: duel.amountOfCards,
      gameName: duel.game,
      mode: "timeLimit",
      duelId: duel._id,
      cardsDuel: duel.cards,
      isDuel: true,
      isRespond: true,
      timeLimit: duel.timeLimit,
    };

    navigation.navigate("Tests", { screen: "CardTest", params: duelOptions });
    setIsDuel((prev) => !prev);
  };

  useEffect(() => {
    const fetchDuels = async () => {
      try {
        const responseDefense = await axios.get(
          `https://caapp-server.onrender.com/duelDefense/${user.username}`
        );
        const responseAttack = await axios.get(
          `https://caapp-server.onrender.com/duelAttack/${user.username}`
        );

        const combinedDuels = [...responseDefense.data, ...responseAttack.data];

        // Сортировка по timestamp в порядке убывания
        combinedDuels.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setDuels(combinedDuels);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching duels:", error);
      }
    };

    user ? fetchDuels() : setDuels([]);
  }, [user]);

  function formatMillisecondsToTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(2);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  const calculateWinner = (duel) => {
    const senderPercentage = duel?.sender[0]?.percentage;
    const receiverPercentage = duel?.reciever[0]?.percentage;
    const senderTimeSpent = duel?.sender[0]?.timeSpent;
    const receiverTimeSpent = duel?.reciever[0]?.timeSpent;

    if (senderPercentage > receiverPercentage) {
      return "sender"; // Sender has higher percentage
    } else if (receiverPercentage > senderPercentage) {
      return "receiver"; // Receiver has higher percentage
    } else if (senderTimeSpent < receiverTimeSpent) {
      return "sender"; // Sender has lower time spent (in case of equal percentages)
    } else if (receiverTimeSpent < senderTimeSpent) {
      return "receiver"; // Receiver has lower time spent (in case of equal percentages)
    } else {
      return "none"; // No winner yet
    }
  };

  // Использование функции для определения цвета
  const determineBackgroundColor = (duel) => {
    const winner = calculateWinner(duel);

    if (winner === "sender" && duel.sender[0]?.username === user.username) {
      return "#479761"; // sender wins and user is the sender
    } else if (
      winner === "receiver" &&
      duel.reciever[0]?.username === user.username
    ) {
      return "#479761"; // receiver wins and user is the receiver
    } else if (winner === "sender") {
      return "#a16e83"; // sender wins but user is not the sender
    } else if (winner === "receiver") {
      return "#a16e83"; // receiver wins but user is not the receiver
    } else {
      return "#29648a"; // no winner yet or user not involved
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <ScrollView
          style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
        >
          {duels.map((duel, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={{
                  ...styles.button,
                  backgroundColor: determineBackgroundColor(duel),
                }}
                onPress={() => handleToggleModalToDuel(duel)}
              >
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text
                      style={{
                        ...styles.buttonText,
                        fontWeight: "bold",
                        height: 20,
                        marginBottom: 10,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {duel?.game}
                    </Text>
                    <Text
                      style={{ ...styles.buttonText, textTransform: "none" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {duel?.sender[0]?.username}
                    </Text>
                    <Text
                      style={{ ...styles.buttonText, textTransform: "none" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {duel?.duelistId}
                    </Text>
                  </View>
                  <View style={{ ...styles.column, width: "25%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 20,
                        marginBottom: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="cards"
                        size={16}
                        color="white"
                      />
                      <Text
                        style={{ ...styles.buttonText, fontWeight: "bold" }}
                      >
                        {" "}
                        {duel?.amountOfCards}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="ios-time-sharp" size={16} color="white" />
                      <Text style={{ ...styles.buttonText }}>
                        {" "}
                        {formatMillisecondsToTime(duel?.sender[0]?.timeSpent)}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons name="ios-time-sharp" size={16} color="white" />
                      <Text style={{ ...styles.buttonText }}>
                        {" "}
                        {duel.reciever && duel.reciever[0]?.timeSpent > 0
                          ? formatMillisecondsToTime(
                              duel?.reciever[0]?.timeSpent
                            )
                          : "––:––.––"}
                      </Text>
                    </View>
                  </View>
                  <View style={{ ...styles.column, width: "25%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        height: 20,
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.buttonText,
                          fontWeight: "bold",
                          fontSize: 15,
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {duel.duelistId === user.username ? "Defense" : "Attack"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        paddingLeft: 15,
                      }}
                    >
                      <FontAwesome5 name="percentage" size={16} color="white" />
                      <Text style={{ ...styles.buttonText }}>
                        {" "}
                        {duel.sender[0].percentage.toFixed(2) || 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        paddingLeft: 15,
                      }}
                    >
                      <FontAwesome5 name="percentage" size={16} color="white" />
                      <Text style={{ ...styles.buttonText }}>
                        {" "}
                        {duel.reciever &&
                        duel.reciever[0]?.percentage !== undefined &&
                        duel.reciever[0].percentage !== null
                          ? duel.reciever[0].percentage.toFixed(2)
                          : "––"}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <Modal
                visible={isDuel}
                transparent
                animationType="fade"
                onRequestClose={() => handleToggleModalToDuel(null)}
              >
                {selectedDuel && (
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.textHeader}>
                        {selectedDuel.game} Duel
                      </Text>

                      <View
                        style={{
                          borderWidth: 2,
                          flex: 1,
                          borderColor: "#29648a",
                          padding: 10,
                          borderRadius: 3,
                        }}
                      >
                        {(selectedDuel && selectedDuel.reciever.length > 1) ||
                        selectedDuel.username === user.username ? (
                          <>
                            <View style={styles.duelistContainer}>
                              <Text
                                style={styles.duelistName}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {selectedDuel.sender[0].username}
                              </Text>
                              <MaterialCommunityIcons
                                name="sword-cross"
                                size={40}
                                color="#a16e83"
                              />
                              <Text
                                style={styles.duelistName}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {selectedDuel.duelistId}
                              </Text>
                            </View>

                            <ScrollView
                              showsVerticalScrollIndicator={false}
                              style={{ flex: 1 }}
                            >
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View style={styles.resultColumn}>
                                  {selectedDuel &&
                                    selectedDuel.sender.slice(1).map((card) => {
                                      return (
                                        <Text
                                          key={card._id}
                                          style={{
                                            ...styles.resultItem,
                                            backgroundColor:
                                              +card.userInput ===
                                              +card.rightAnswer
                                                ? "#479761"
                                                : "#a16e83",
                                          }}
                                        >
                                          {card.userInput}
                                        </Text>
                                      );
                                    })}
                                </View>
                                <View style={styles.resultColumn}>
                                  {selectedDuel &&
                                    selectedDuel.cards.map((card) => {
                                      return (
                                        <View
                                          key={card._id}
                                          style={{
                                            ...styles.resultItem,
                                            backgroundColor: "#fff",
                                            paddingVertical: 0,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 18,
                                              fontWeight: "bold",
                                              color: "#29648a",
                                              paddingVertical: 0,
                                              textAlign: "center",
                                            }}
                                          >
                                            {card.cardNumber}
                                          </Text>
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "#29648a",
                                              paddingVertical: 0,
                                              textAlign: "center",
                                            }}
                                          >
                                            {card.cardName}
                                          </Text>
                                        </View>
                                      );
                                    })}
                                </View>
                                <View style={styles.resultColumn}>
                                  {selectedDuel &&
                                    selectedDuel.reciever
                                      .slice(1)
                                      .map((card) => {
                                        return (
                                          <Text
                                            key={card._id}
                                            style={{
                                              ...styles.resultItem,
                                              backgroundColor:
                                                +card.userInput ===
                                                +card.rightAnswer
                                                  ? "#479761"
                                                  : "#a16e83",
                                            }}
                                          >
                                            {card.userInput}
                                          </Text>
                                        );
                                      })}
                                </View>
                              </View>
                            </ScrollView>
                          </>
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                color: "#29648a",
                                fontWeight: "bold",
                              }}
                            >
                              {selectedDuel.username}
                            </Text>
                            <MaterialCommunityIcons
                              name="sword-cross"
                              size={70}
                              color="#a16e83"
                              style={{ marginVertical: 20 }}
                            />
                            <Text
                              style={{
                                fontSize: 30,
                                color: "#29648a",
                                fontWeight: "bold",
                              }}
                            >
                              {selectedDuel.duelistId}
                            </Text>
                          </View>
                        )}
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "#29648a",
                            marginTop: 15,
                          }}
                        >
                          The user will receive a duel notification as soon as
                          you complete the test
                        </Text>

                        <View style={styles.buttonContainer}>
                          {(selectedDuel && selectedDuel.reciever.length > 1) ||
                          selectedDuel.sender[0].username === user.username ? (
                            <>
                              <TouchableOpacity
                                style={{
                                  ...styles.startButton,
                                  backgroundColor: !user ? "#555" : "#a16e83",
                                }}
                                onPress={() => handleToggleModalToDuel(null)}
                              >
                                <Text style={styles.startButtonText}>
                                  close
                                </Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <>
                              <TouchableOpacity
                                style={{
                                  ...styles.startButton,
                                  backgroundColor: !user ? "#555" : "#a16e83",
                                }}
                                onPress={() => handleToggleModalToDuel(null)}
                              >
                                <Text style={styles.startButtonText}>
                                  cancel
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.startButton}
                                onPress={() =>
                                  handleNavigationToDuel(selectedDuel)
                                }
                              >
                                <Text style={styles.startButtonText}>
                                  start
                                </Text>
                              </TouchableOpacity>
                            </>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </Modal>
            </React.Fragment>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultColumn: {
    gap: 5,
    width: "30%",
  },
  resultItem: {
    width: "100%",
    paddingVertical: 10,
    textAlign: "center",
    borderRadius: 5,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  break: {
    height: 2,
    borderColor: "#29648a",
    borderWidth: 1,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#29648a",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 3,
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 54,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
    right: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "300",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
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
  textHeader: {
    textAlign: "center",
    fontSize: 24,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
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
  startButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  duelistName: {
    fontSize: 16,
    color: "#29648a",
    fontWeight: "bold",
    width: "40%",
    textAlign: "center",
  },
  duelistContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
});

export default DuelAll;
