import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

function Card({ title, number, index }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={{ textAlign: "center", fontSize: 20, color: "#fff" }}>{title}</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 68,
            fontWeight: "bold",
            marginVertical: Dimensions.get('window').height * 0.02,
            color: "#fff",
          }}
        >
          {number}
        </Text>
        <Text style={{ textAlign: "right", fontSize: 14, color: "#fff" }}>
          {index}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: 20,
    // transform: [{scale: 0.8}]
    maxHeight: Dimensions.get('window').height * 0.25
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#29648a",
    borderRadius: 3,
    padding: 10,
    width: "90%",
    backgroundColor: "#29648a",
  },
});

export default Card;
