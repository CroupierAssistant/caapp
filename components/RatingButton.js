import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const RatingButton = ({ onPress, gameName }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(gameName)}>
      <Text>{gameName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ccc", // Цвет кнопки
    borderRadius: 5,
    alignItems: "center",
  },
});

export default RatingButton;
