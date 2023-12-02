import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import UserProfileModal from "./UserProfileModal";
import Loader from "./Loader";
// import { findUserById } from "../models/User";

const RatingsModal = ({ isVisible, onClose, ratings, game }) => {
  const [activeTab, setActiveTab] = useState(10);
  const [aggregatedData, setAggregatedData] = useState(null); // Добавляем состояние для хранения данных
  const [selectedUser, setSelectedUser] = useState(null); // Add selectedUser state
  const [isLoading, setIsLoading] = useState(true);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.round((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(ms).padStart(2, "0")}`;
  };

  const findUserById = async (userId) => {
    try {
      const response = await axios.get(
        // `https://10000-croupierassistan-caapp-08t6zzqrh2x.ws-us106.gitpod.io/users/${userId}`
        `https://caapp-server.onrender.com/users/${userId}`
      );
      return response.data;
    } catch (error) {
      // console.error("Ошибка при поиске пользователя:", error);
      throw error;
    }
  };

  const openProfile = async (idPassed) => {
    const user = await findUserById(idPassed);

    if (user) {
      setSelectedUser(user);
    }
  };

  useEffect(() => {
    const getRatingData = async () => {
      try {
        const userPromises = ratings.map(async (item) => {
          try {
            const user = await findUserById(item.userId);
            if (user) {
              return {
                ...item,
                showUserData: user.showUserData, // Include showUserData property
              };
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            return item;
          }
        });
  
        const users = await Promise.all(userPromises);

        const groupedByAmountOfCards = {
          10: [],
          20: [],
          30: [],
        };
  
        users.forEach((item) => {
          if (item.amountOfCards) {
            const key = item.amountOfCards.toString();
            groupedByAmountOfCards[key].push(item);
          }
        });
  
        const newData = {};
  
      Object.keys(groupedByAmountOfCards).forEach((amountOfCards) => {
        const groupedData = groupedByAmountOfCards[amountOfCards].reduce((result, item) => {
              const key = item.username;
              if (!result[key]) {
                result[key] = {
                  maxPercentage: -Infinity,
                  minTimeSpentTest: Infinity,
                  userId: item.userId,
                  amountOfCards: item.amountOfCards,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  showUserData: item.showUserData, // Use the fetched showUserData
                };
              }
  
              if (item.percentage > result[key].maxPercentage) {
                result[key].maxPercentage = item.percentage;
                result[key].minTimeSpentTest = item.timeSpentTest;
              } else if (item.percentage === result[key].maxPercentage) {
                if (item.timeSpentTest < result[key].minTimeSpentTest) {
                  result[key].minTimeSpentTest = item.timeSpentTest;
                }
              }
  
              return result;
            },
            {}
          );
  
          newData[amountOfCards] = Object.keys(groupedData)
          .map((username) => ({
              username,
              userId: groupedData[username].userId,
              maxPercentage: groupedData[username].maxPercentage,
              minTimeSpentTest: groupedData[username].minTimeSpentTest,
              amountOfCards: groupedData[username].amountOfCards,
              firstName: groupedData[username].firstName,
              lastName: groupedData[username].lastName,
              showUserData: groupedData[username].showUserData,
            }))
            .sort((a, b) => {
              if (a.maxPercentage !== b.maxPercentage) {
                return b.maxPercentage - a.maxPercentage;
              }
              return a.minTimeSpentTest - b.minTimeSpentTest;
            });
        });
  
        setAggregatedData(newData);
        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setIsLoading(false);
      }
    };
  
    getRatingData();
  }, [ratings]);
  

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textHeader}>{game}</Text>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 10 ? styles.activeTab : null]}
              onPress={() => setActiveTab(10)}
            >
              <Text style={styles.tabText}>10 Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 20 ? styles.activeTab : null]}
              onPress={() => setActiveTab(20)}
            >
              <Text style={styles.tabText}>20 Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 30 ? styles.activeTab : null]}
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
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {aggregatedData && aggregatedData[activeTab].length > 0 ? (
                  <FlatList
                    data={aggregatedData[activeTab]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        onPress={() =>
                          item.showUserData && openProfile(item.userId)
                        }
                        style={[styles.row]}
                      >
                        <View
                          style={[
                            styles.textIndexContainer,
                            index === 0
                              ? styles.gold
                              : index === 1
                                ? styles.silver
                                : index === 2
                                  ? styles.bronze
                                  : "",
                          ]}
                        >
                          <Text
                            style={{
                              ...styles.textIndex,
                              color: index >= 0 && index <= 2 ? "#fff" : "",
                            }}
                          >
                            {index + 1}
                          </Text>
                        </View>
                        <View
                          style={{
                            ...styles.text,
                            width: "50%",
                            paddingHorizontal: 3,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ fontSize: 14, textAlign: "center" }}
                          >
                            {item.username}
                          </Text>
                          {item.showUserData && (
                            <AntDesign
                              name="profile"
                              size={20}
                              color="#29648a"
                            />
                          )}
                        </View>
                        <Text
                          style={{
                            ...styles.text,
                            width: "20%",
                            paddingHorizontal: 3,
                          }}
                        >
                          {Number(item.maxPercentage).toFixed(2)}%
                        </Text>
                        <Text style={{ ...styles.text, width: "20%" }}>
                          {formatTime(item.minTimeSpentTest)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <Text style={styles.textNoData}>
                    {`No one's here... You can be the first!`}
                  </Text>
                )}
              </>
            )}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        <UserProfileModal
          isVisible={selectedUser !== null}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderBottomColor: "#29648a",
  },
  text: {
    // flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 14,
    // lineHeight: 22,
  },
  textNoData: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 30,
  },
  textIndex: {
    lineHeight: 22,
    fontWeight: "bold",
  },
  textIndexContainer: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
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
  gold: {
    backgroundColor: "#FFD700", // Золотой цвет
  },
  silver: {
    backgroundColor: "#C0C0C0", // Серебрянный цвет
  },
  bronze: {
    backgroundColor: "#CD7F32", // Бронзовый цвет
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
    // marginHorizontal: 1,
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
});

export default RatingsModal;
