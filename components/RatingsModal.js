import React from "react";
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
  return (
    <Modal visible={isVisible} transparent animationType="none">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.textHeader}>{game}</Text>
          {ratings ? (
            <FlatList
              data={ratings}
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
                  <Text
                    style={{
                      ...styles.text,
                      width: "50%",
                      paddingHorizontal: 3,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.username}
                  </Text>
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
                    {item.minTimeSpentTest}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.text}>
              No one's here... You can be the first!
            </Text>
          )}
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
    borderRadius: 10,
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
    fontSize: 20,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: "center",
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#29648a", // Цвет кнопки закрытия
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
});

export default RatingsModal;
