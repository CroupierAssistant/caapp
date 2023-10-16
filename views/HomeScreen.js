import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

function HomeScreen({ route }) {
  const { login, logout, user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.greetingsText, { color: user ? `#479761` : `#a16e83` }]}>
          Hi {user ? user.username : `Guest`}!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Blackjack")}
        >
          <Text style={styles.buttonText}>Blackjack</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MultiplicationTable")}
        >
          <Text style={styles.buttonText}>Multiplication Table</Text>
        </TouchableOpacity>

        <View style={styles.break} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RouletteSeries")}
        >
          <Text style={styles.buttonText}>Roulette Series</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RoulettePictures")}
        >
          <Text style={styles.buttonText}>Roulette Pictures</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#aaa" }}
          onPress={() => navigation.navigate("#")}
          disabled={true}
        >
          <Text style={styles.buttonText}>
            Roulette Straight Up Complete Bet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#aaa" }}
          onPress={() => navigation.navigate("#")}
          disabled={true}
        >
          <Text style={styles.buttonText}>
            Roulette Complete Bet Intersections
          </Text>
        </TouchableOpacity> */}

        <View style={styles.break} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPokerAnte")}
        >
          <Text style={styles.buttonText}>Russian poker Ante</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPoker5Bonus")}
        >
          <Text style={styles.buttonText}>Russian poker 5-bonus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPokerBonus")}
        >
          <Text style={styles.buttonText}>Russian poker 6-bonus</Text>
        </TouchableOpacity>

        <View style={styles.break} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UTHBlindBets")}
        >
          <Text style={styles.buttonText}>UTH Blind Bets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UTHTripsBets")}
        >
          <Text style={styles.buttonText}>UTH Trips Bets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TexasHoldEm")}
        >
          <Text style={styles.buttonText}>Texas Hold'em Bonus</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 20,
  },
  break: {
    height: 2,
    borderColor: "#29648a",
    borderWidth: 1,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#29648a",
    padding: 10,
    marginVertical: 5,
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
