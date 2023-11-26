import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function HomeScreen({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>TESTS</Text>

      <ScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#fff" }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Blackjack")}
        >
          <Text style={styles.buttonText}>Blackjack</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
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
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPokerAnte")}
        >
          <Text style={styles.buttonText}>Russian poker Ante</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPoker5Bonus")}
        >
          <Text style={styles.buttonText}>Russian poker 5-bonus</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RussianPokerBonus")}
        >
          <Text style={styles.buttonText}>Russian poker 6-bonus</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UTHBlindBets")}
        >
          <Text style={styles.buttonText}>UTH Blind Bets</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UTHTripsBets")}
        >
          <Text style={styles.buttonText}>UTH Trips Bets</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TexasHoldEm")}
        >
          <Text style={styles.buttonText}>Texas Hold'em Bonus</Text>
          {/* <Text style={styles.buttonText}>
            <Entypo name="plus" size={20} color="#fff" />
            <MaterialCommunityIcons name="sword-cross" size={20} color="#fff" />
          </Text> */}
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
    backgroundColor: "#fff",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 54,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    top: 8,
    right: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "300",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
});

export default HomeScreen;
