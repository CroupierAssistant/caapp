import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  const handleNavigateToBlackjack = () => {
    navigation.navigate("Blackjack");
  };

  const handleNavigateToRoulette = () => {
    navigation.navigate("Roulette");
  };

  const handleNavigateToPoker = () => {
    navigation.navigate("Poker");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingsText}>Hi user!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToBlackjack}
      >
        <Text style={styles.buttonText}>Blackjack</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToRoulette}
      >
        <Text style={styles.buttonText}>Roulette</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToPoker}>
        <Text style={styles.buttonText}>Poker</Text>
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
  button: {
    width: "100%",
    backgroundColor: "#4783b8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  greetingsText: {
    color: "black",
    fontSize: 26,
    marginBottom: 30,
    textAlign: "left",
    width: "100%",
    fontWeight: "bold"
  },
});

export default HomeScreen;
