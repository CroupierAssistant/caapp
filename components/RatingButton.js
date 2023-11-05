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
  // button: {
  //   width: "100%",
  //   backgroundColor: "#3F5C6F",
  //   paddingHorizontal: 10,
  //   paddingVertical: 15,
  //   marginVertical: 3,
  //   borderRadius: 3,
  // },
  
  button: {
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 3,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54
  },
  
  buttonText: {
    color: "#29648a",
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 20,
  // },
});

export default RatingButton;
