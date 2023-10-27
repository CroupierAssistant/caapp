import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import Switcher from "../../components/Switcher";
import { FontAwesome } from "@expo/vector-icons";

function Neighbours() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60000);

  const [selectedButton, setSelectedButton] = useState("10");
  const handleButtonPress = (value) => {
    setTimeLimit(value * 6000);
    setSelectedButton(value);
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleNavigateToTest = () => {
    navigation.navigate("NeighboursTest", {
      mode: isEnabled ? "sandbox" : "timelimit",
      amountOfCards: Number(!isEnabled ? selectedButton : 37),
      timeLimit: timeLimit,
      gameName: "Neighbours",
    });
  };

  return (
    <View style={styles.container}>
      <Switcher isEnabled={isEnabled} toggleSwitch={toggleSwitch} user={user} />
      {!user && (
        <Text style={{ ...styles.timeLimitDescription, marginTop: -20 }}>
          When you're not logged in, only the Time Limit mode is accessible
        </Text>
      )}
      {!isEnabled && (
        <>
          <Text style={styles.modeSelectText}>Time limit mode</Text>
          <>
            {!user && (
              <Text style={styles.timeLimitDescription}>
                When you're not logged in, only one option is available
              </Text>
            )}
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonFirst,
                  selectedButton === "10" && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress("10")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedButton === "10" && styles.selectedRadioButtonText,
                  ]}
                >
                  10 cards
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!user}
                style={[
                  styles.radioButton,
                  !user && styles.radioButtonDisabled,
                  selectedButton === "15" && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress("15")}
              >
                {user ? (
                  <Text
                    style={[
                      styles.radioButtonText,
                      selectedButton === "15" && styles.selectedRadioButtonText,
                    ]}
                  >
                    15 cards
                  </Text>
                ) : (
                  <FontAwesome
                    style={styles.lockIcon}
                    name="lock"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                disabled={!user}
                style={[
                  styles.radioButton,
                  styles.radioButtonLast,
                  !user && styles.radioButtonDisabled,
                  selectedButton === "20" && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress("20")}
              >
                {user ? (
                  <Text
                    style={[
                      styles.radioButtonText,
                      selectedButton === "20" && styles.selectedRadioButtonText,
                    ]}
                  >
                    20 cards
                  </Text>
                ) : (
                  <FontAwesome
                    style={styles.lockIcon}
                    name="lock"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.timeLimitDescription}>
              The goal is to pick the right neighbours for given amount of
              numbers in {timeLimit / 1000} seconds. The order of selection does
              not matter. You can also change your selection before clicking
              "Confirm". You have the option to skip a card and return to it
              later
            </Text>
          </>
        </>
      )}
      {isEnabled && (
        <>
          <Text style={styles.modeSelectText}>Sandbox mode</Text>
          <Text style={{ ...styles.timeLimitDescription }}>
            There is no time limit in this mode. Take your time and be careful.
            The goal is to pick the right neighbours for given number. The order
            of selection does not matter. You can also change your selection
            before clicking "Confirm". If you choose to skip the card in this
            mode, you will not see this card again
          </Text>
        </>
      )}

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
    backgroundColor: "#fff",
  },
  switcherHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  lockIcon: {
    textAlign: "center",
  },
  label: {
    fontSize: 26,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  radioButton: {
    width: "33%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#29648a",
  },
  startButton: {
    width: "50%",
    marginTop: "auto",
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#008486",
    borderRadius: 5,
  },
  startButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    textTransform: "uppercase",
  },
  radioButtonDisabled: {
    backgroundColor: "#b19f9e",
  },
  radioButtonFirst: {
    borderBottomStartRadius: 5,
    borderTopStartRadius: 5,
  },
  radioButtonLast: {
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    borderRightWidth: 1,
  },
  selectedButton: {
    backgroundColor: "#29648a",
  },
  radioButtonText: {
    textAlign: "center",
    fontSize: 16,
  },
  selectedRadioButtonText: {
    color: "#fff",
  },
  modeSelectText: {
    color: "black",
    fontSize: 20,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeLimitDescription: {
    marginVertical: 20,
    fontSize: 16,
    textAlign: "left",
    width: "100%",
  },
  radioLegend: {
    width: "100%",
    textAlign: "left",
    fontSize: 16,
    marginTop: 20,
    marginBottom: -5,
  },
});

export default Neighbours;
