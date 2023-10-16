import React from "react";
import { View, Text, StyleSheet } from "react-native";

function CardPicture({ index, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {children}
        {/* Размещаем children (в данном случае RoulettePictureCenter) */}
        <Text style={{ width: '100%', textAlign: "right", fontSize: 14, color: "#000" }}>
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
  },
  cardContainer: {
    borderRadius: 5,
    padding: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: 600
    // marginLeft: 100,
    // marginTop: 60
  },
});

export default CardPicture;
