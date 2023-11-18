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

function RussianPokerBonus() {
  const navigation = useNavigation();
  const [timeLimit, settimeLimit] = useState(90000);

  const handleNavigateToTest = () => {
    navigation.navigate("CardTest", {
      mode: isEnabled ? "sandbox" : "timeLimit",
      amountOfCards: Number(!isEnabled ? selectedButton : 0),
      minBet: Number(selectedMinBet),
      maxBet: Number(selectedMaxBet),
      step: Number(selectedStep),
      timeLimit: timeLimit,
      splitCoeff: false,
      gameName: "Russian Poker 6-bonus",
      combinations: combinations,
    });
  };

  const [combinations, setCombinations] = useState([
    {
      name: "Straight",
      coeff: 8,
    },
    {
      name: "Flush",
      coeff: 15,
    },
    {
      name: "Full house",
      coeff: 30,
    },
    {
      name: "Four of a kind",
      coeff: 100,
    },
    {
      name: "Straight flush",
      coeff: 150,
    },
    {
      name: "Royal flush",
      coeff: 300,
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
    settimeLimit(value * 9000);
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Switcher
          isEnabled={isEnabled}
          toggleSwitch={toggleSwitch}
          user={user}
        />
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
                The goal is to calculate payouts for {selectedButton} bets
                within {timeLimit / 1000} seconds. You have the option to skip a
                card and return to it later
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
                At the free subscription plan, only one option from each
                selection is available
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
              <Text style={styles.timeLimitDescription}>
                Choose the minimum and maximum number, as well as the
                multiplicity to calculate the payouts. If you choose to skip the
                card in this mode, you will not see this card again. There is no
                time limit, so take your time and enjoy
              </Text>
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
    borderRadius: 3,
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

export default RussianPokerBonus;
