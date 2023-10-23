import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const RatingButton = ({ onPress, gameName }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(gameName)}>
      <Text style={styles.buttonText}>{gameName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#29648a",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 3,
    borderRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default RatingButton;
