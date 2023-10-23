import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CardPicture({ index, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* <Text style={{ textAlign: "right", fontSize: 14, color: "#fff" }}>
          {" "}
        </Text> */}
        {children}
        {/* Размещаем children (в данном случае RoulettePictureCenter) */}
        <Text style={{ width: '100%', textAlign: "right", fontSize: 14, color: "#000", position: 'absolute', top: 5 }}>
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
    borderRadius: 3,
    padding: 10,
    width: "90%",
    backgroundColor: "#29648a57",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardPicture;
