import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

function Card({ title, number, index }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>{title}</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 72,
            fontWeight: "bold",
            marginVertical: 25,
          }}
        >
          {number}
        </Text>
        <Text style={{ textAlign: "right", fontSize: 14 }}>{index}</Text>
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
    marginVertical: 20,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#4783b8",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    backgroundColor: "#4783b8",
    shadowColor: "#003665",
    shadowOffset: {
      width: 5,
      height: 18,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.0,
    elevation: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginVertical: 5,
  },
});

export default Card;
