import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

function HomeScreen({ route }) {
  const { login, logout, user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>TESTS</Text>

      <ScrollView
        style={{ flex: 1, width: "100%", backgroundColor: '#fff' }}
        showsVerticalScrollIndicator={false}
      >
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RouletteSeries")}
        >
          <Text style={styles.buttonText}>Roulette Series</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RoulettePictures")}
        >
          <Text style={styles.buttonText}>Roulette Pictures</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Neighbours")}
        >
          <Text style={styles.buttonText}>Neighbours</Text>
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

        {/* <View style={styles.break} />

        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#aaa" }}
          onPress={() => navigation.navigate("NiuNiuCombinations")}
        >
          <Text style={styles.buttonText}>Niu-Niu Combinations</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff'
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
    paddingHorizontal: 15,
    marginVertical: 3,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54
  },
  buttonIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    top: 8,
    right: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '300'
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase"
  },
});

export default HomeScreen;
