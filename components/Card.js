import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

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
            marginVertical: 25,
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
    transform: [{scale: 0.9}]
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
