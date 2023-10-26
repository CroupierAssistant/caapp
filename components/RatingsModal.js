import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const RatingsModal = ({ isVisible, onClose, ratings, game }) => {
  const [activeTab, setActiveTab] = useState(10);

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

  const groupedByAmountOfCards = {
    10: [],
    20: [],
    30: []
  };
  
  ratings.forEach(item => {
    if (item.amountOfCards) {
      const key = item.amountOfCards.toString();
      groupedByAmountOfCards[key].push(item);
    }
  });
  
  const aggregatedData = {};
  
  Object.keys(groupedByAmountOfCards).forEach(amountOfCards => {
    const groupedData = groupedByAmountOfCards[amountOfCards].reduce((result, item) => {
      const key = item.username;
      if (!result[key]) {
        result[key] = {
          maxPercentage: -Infinity,
          minTimeSpentTest: Infinity,
          amountOfCards: item.amountOfCards,
          firstName: item.firstName,
          lastName: item.lastName,
          showUserData: item.showUserData,
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
    }, {});
  
    aggregatedData[amountOfCards] = Object.keys(groupedData).map(username => ({
      username,
      maxPercentage: groupedData[username].maxPercentage,
      minTimeSpentTest: groupedData[username].minTimeSpentTest,
      amountOfCards: groupedData[username].amountOfCards,
      firstName: groupedData[username].firstName,
      lastName: groupedData[username].lastName,
      showUserData: groupedData[username].showUserData,
    })).sort((a, b) => {
      // Сначала сортируем по maxPercentage в убывающем порядке
      if (a.maxPercentage !== b.maxPercentage) {
        return b.maxPercentage - a.maxPercentage;
      }
  
      // Если maxPercentage совпадают, сортируем по minTimeSpentTest в возрастающем порядке
      return a.minTimeSpentTest - b.minTimeSpentTest;
    });
  });

  // console.log(ratings);

  return (
    <Modal visible={isVisible} transparent animationType="none">
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
            {aggregatedData[activeTab].length > 0 ? (
              <FlatList
                data={aggregatedData[activeTab]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={[styles.row]}>
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
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: 14, textAlign: 'center'}}>{item.username}</Text>
                      {item.showUserData && <Text style={{fontSize: 12, textAlign: 'center'}}>{item.firstName} {item.lastName}</Text>}
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
                  </View>
                )}
              />
            ) : (
              <Text style={styles.textNoData}>
                {`¯\\_(ツ)_/¯ \n No one's here... You can be the first!`}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  text: {
    // flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 30,
  },
  textNoData: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 30,
  },
  textIndex: {
    lineHeight: 25,
    fontWeight: "bold",
  },
  textIndexContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
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