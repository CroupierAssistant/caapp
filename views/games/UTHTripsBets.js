import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Switcher from "../../components/Switcher";
import Paytable from "../../components/Paytable";

function UTHTripsBets() {
  const navigation = useNavigation();

  const handleNavigateToTest = () => {
    navigation.navigate("CardTest", {
      mode: isEnabled ? "sandbox" : "timelimit",
      amountOfCards: Number(!isEnabled ? selectedButton : 0),
      minBet: Number(selectedMinBet),
      maxBet: Number(selectedMaxBet),
      step: Number(selectedStep),
      timeLimit: 90000,
      splitCoeff: false,
      combinations: combinations,
    });
  };

  const [combinations, setCombinations] = useState([
    {
      name: "Three of a kind",
      coeff: 3,
    },
    {
      name: "Straight",
      coeff: 4,
    },
    {
      name: "Flush",
      coeff: 7,
    },
    {
      name: "Full house",
      coeff: 8,
    },
    {
      name: "Four of a kind",
      coeff: 30,
    },
    {
      name: "Straight flush",
      coeff: 40,
    },
    {
      name: "Royal flush",
      coeff: 50,
    },
  ]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setSelectedButton("10");
    setIsEnabled(false);
  }, [user]);

  const [isPremium, setIsPremium] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setSelectedStep("5");
    setSelectedMinBet("5");
    setSelectedMaxBet("500");
    setIsEnabled((previousState) => !previousState);
  };

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
    <ScrollView>
      <View style={styles.container}>
        <Switcher
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          user={user}
        />
        {!user && (
          <Text style={{ ...styles.timeLimitDescription, marginTop: -20 }}>
            Only Time Limit Mode available when you are not logged in.
          </Text>
        )}
        {!isEnabled && (
          <>
            <Text style={styles.modeSelectText}>Time limit mode</Text>
            <>
              {!user && (
                <Text style={styles.timeLimitDescription}>
                  Only one option available when you are not logged in.
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
                    selectedButton === "20" && styles.selectedButton,
                  ]}
                  onPress={() => handleButtonPress("20")}
                >
                  {user ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedButton === "20" &&
                          styles.selectedRadioButtonText,
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
                <TouchableOpacity
                  disabled={!user}
                  style={[
                    styles.radioButton,
                    styles.radioButtonLast,
                    !user && styles.radioButtonDisabled,
                    selectedButton === "30" && styles.selectedButton,
                  ]}
                  onPress={() => handleButtonPress("30")}
                >
                  {user ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedButton === "30" &&
                          styles.selectedRadioButtonText,
                      ]}
                    >
                      30 cards
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
                The goal is calculate payouts for {selectedButton} bets in 90
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
            {!isPremium && (
              <Text style={{ ...styles.timeLimitDescription }}>
                Only one option of each selecion is available when you are not
                Premium.
              </Text>
            )}
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
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    selectedMinBet === "25" && styles.selectedButton,
                  ]}
                  onPress={() => handleMinBetSelect("25")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedMinBet === "25" &&
                          styles.selectedRadioButtonText,
                      ]}
                    >
                      25
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
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    styles.radioButtonLast,
                    selectedMinBet === "100" && styles.selectedButton,
                  ]}
                  onPress={() => handleMinBetSelect("100")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedMinBet === "100" &&
                          styles.selectedRadioButtonText,
                      ]}
                    >
                      100
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
                      selectedMaxBet === "500" &&
                        styles.selectedRadioButtonText,
                    ]}
                  >
                    500
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    selectedMaxBet === "1000" && styles.selectedButton,
                  ]}
                  onPress={() => handleMaxBetSelect("1000")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedMaxBet === "1000" &&
                          styles.selectedRadioButtonText,
                      ]}
                    >
                      1000
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
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    styles.radioButtonLast,
                    selectedMaxBet === "5000" && styles.selectedButton,
                  ]}
                  onPress={() => handleMaxBetSelect("5000")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedMaxBet === "5000" &&
                          styles.selectedRadioButtonText,
                      ]}
                    >
                      5000
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
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    selectedStep === "10" && styles.selectedButton,
                  ]}
                  onPress={() => handleStepSelect("10")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedStep === "10" && styles.selectedRadioButtonText,
                      ]}
                    >
                      10
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
                  disabled={!isPremium}
                  style={[
                    !isPremium && styles.radioButtonDisabled,
                    styles.radioButton,
                    styles.radioButtonLast,
                    selectedStep === "25" && styles.selectedButton,
                  ]}
                  onPress={() => handleStepSelect("25")}
                >
                  {isPremium ? (
                    <Text
                      style={[
                        styles.radioButtonText,
                        selectedStep === "25" && styles.selectedRadioButtonText,
                      ]}
                    >
                      25
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
            </>
          </>
        )}

        <Paytable combinations={combinations} splitCoeff={false} />

        <TouchableOpacity
          style={[styles.startButton]}
          onPress={handleNavigateToTest}
        >
          <Text style={[styles.startButtonText]}>Start</Text>
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
    marginVertical: 10,
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

export default UTHTripsBets;
