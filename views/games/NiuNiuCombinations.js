import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function NiuNiuCombinations() {
  const navigation = useNavigation();

  const handleNavigateToTest = () => {
    navigation.navigate("NiuNiuCombinationsTest", {
      mode: "sandbox",
      amountOfCards: 0,
      combinations: [],
    });
  };

  return (
    <View style={styles.container}>
      <Text>Info</Text>
      <TouchableOpacity
        style={[styles.startButton]}
        onPress={handleNavigateToTest}
      >
        <Text style={[styles.startButtonText]}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 20,
  },
  startButton: {
    width: "50%",
    marginTop: "auto",
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#008486",
    borderRadius: 3,
  },
  startButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
});

export default NiuNiuCombinations;
