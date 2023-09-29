import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

function HomeScreen({ route }) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.greetingsText, {color: isAuthenticated ? `#479761` : `#a16e83`}]}>
        Hi {isAuthenticated ? `USER` : `GUEST`}!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Blackjack")}>
        <Text style={styles.buttonText}>Blackjack</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RouletteSeries")}>
        <Text style={styles.buttonText}>Roulette Series</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RussianPokerAnte")}>
        <Text style={styles.buttonText}>Russian poker Ante</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RussianPokerBonus")}>
        <Text style={styles.buttonText}>Russian poker 6-bonus</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("UTHBlindBets")}>
        <Text style={styles.buttonText}>UTH Blind Bets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("UTHTripsBets")}>
        <Text style={styles.buttonText}>UTH Trips Bets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TexasHoldEm")}>
        <Text style={styles.buttonText}>Texas Hold'em Bonus</Text>
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
    backgroundColor: "#29648a",
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
    fontWeight: "bold",
  },
});

export default HomeScreen;
