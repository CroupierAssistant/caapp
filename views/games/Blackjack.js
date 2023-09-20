import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import SwitchSelector from "react-native-switch-selector";

function Blackjack() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const [selectedButton, setSelectedButton] = useState("10");
  const handleButtonPress = (value) => {
    setSelectedButton(value);
  };

  const [selectedStep, setSelectedStep] = useState("5");
  const handleStepSelect = (value) => {
    setSelectedStep(value);
  };

  const [selectedMinBet, setSelectedMinBet] = useState("5");
  const handleMinBetSelect = (value) => {
    setSelectedMinBet(value);
  };

  const [selectedMaxBet, setSelectedMaxBet] = useState("500");
  const handleMaxBetSelect = (value) => {
    setSelectedMaxBet(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.switcherHeader}>
        <Text style={styles.label}>Switch mode</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      {!isEnabled && (
        <>
          <Text style={styles.modeSelectText}>Time limit mode</Text>
          <>
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
                style={[
                  styles.radioButton,
                  selectedButton === "20" && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress("20")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedButton === "20" && styles.selectedRadioButtonText,
                  ]}
                >
                  20 cards
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonLast,
                  selectedButton === "30" && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress("30")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedButton === "30" && styles.selectedRadioButtonText,
                  ]}
                >
                  30 cards
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.timeLimitDescription}>
              The goal is calculate payouts for selected amount of cards in 60
              seconds
            </Text>
          </>
        </>
      )}
      {isEnabled && (
        <>
          <Text style={styles.modeSelectText}>
            <Text>Sandbox mode</Text>
          </Text>
          <>
            <Text style={styles.radioLegend}>Select min-bet:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonFirst,
                  selectedMinBet === "5" && styles.selectedButton,
                ]}
                onPress={() => handleMinBetSelect("5")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMinBet === "5" && styles.selectedRadioButtonText,
                  ]}
                >
                  5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedMinBet === "25" && styles.selectedButton,
                ]}
                onPress={() => handleMinBetSelect("25")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMinBet === "25" && styles.selectedRadioButtonText,
                  ]}
                >
                  25
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonLast,
                  selectedMinBet === "100" && styles.selectedButton,
                ]}
                onPress={() => handleMinBetSelect("100")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMinBet === "100" && styles.selectedRadioButtonText,
                  ]}
                >
                  100
                </Text>
              </TouchableOpacity>
            </View>
          </>
          <>
            <Text style={styles.radioLegend}>Select max-bet:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonFirst,
                  selectedMaxBet === "500" && styles.selectedButton,
                ]}
                onPress={() => handleMaxBetSelect("500")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMaxBet === "500" && styles.selectedRadioButtonText,
                  ]}
                >
                  500
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedMaxBet === "1000" && styles.selectedButton,
                ]}
                onPress={() => handleMaxBetSelect("1000")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMaxBet === "1000" && styles.selectedRadioButtonText,
                  ]}
                >
                  1000
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonLast,
                  selectedMaxBet === "5000" && styles.selectedButton,
                ]}
                onPress={() => handleMaxBetSelect("5000")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedMaxBet === "5000" && styles.selectedRadioButtonText,
                  ]}
                >
                  5000
                </Text>
              </TouchableOpacity>
            </View>
          </>
          <>
            <Text style={styles.radioLegend}>Select step:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonFirst,
                  selectedStep === "5" && styles.selectedButton,
                ]}
                onPress={() => handleStepSelect("5")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedStep === "5" && styles.selectedRadioButtonText,
                  ]}
                >
                  5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedStep === "10" && styles.selectedButton,
                ]}
                onPress={() => handleStepSelect("10")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedStep === "10" && styles.selectedRadioButtonText,
                  ]}
                >
                  10
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  styles.radioButtonLast,
                  selectedStep === "25" && styles.selectedButton,
                ]}
                onPress={() => handleStepSelect("25")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selectedStep === "25" && styles.selectedRadioButtonText,
                  ]}
                >
                  25
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </>
      )}
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
  switcherHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
  label: {
    fontSize: 26,
  },
  switchContainer: {
    // marginLeft: 'auto',
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
  },
  radioButton: {
    width: "33%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#4783b8",
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
    backgroundColor: "#4783b8",
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
    marginVertical: 15,
    fontSize: 16,
    textAlign: "left",
    width: "100%",
  },
  radioLegend: {
    width: "100%",
    textAlign: "left",
    fontSize: 16,
    marginTop: 20,
    marginBottom: -10,
  },
});

export default Blackjack;
