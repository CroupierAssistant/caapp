import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MultiplicationTable() {
  const navigation = useNavigation();

  const handleNavigateToTest = () => {
    navigation.navigate("MultiplicationTableTest", {
      mode: "sandbox",
      amountOfCards: 0,
      minBet: Number(selectedMinBet),
      maxBet: Number(selectedMaxBet),
      splitCoeff: false,
      combinations: [
        {
          name: "5", coeff: 5, selected: selected5
        },
        {
          name: "8", coeff: 8, selected: selected8
        },
        {
          name: "11", coeff: 11, selected: selected11
        },
        {
          name: "17", coeff: 17, selected: selected17
        },
        {
          name: "35", coeff: 35, selected: selected35
        },
      ],
    });
  };

  const [selected5, setSelected5] = useState(true);
  const handleSelect5 = () => {
    setSelected5(prev => !prev);
  };
  const [selected8, setSelected8] = useState(true);
  const handleSelect8 = () => {
    setSelected8(prev => !prev);
  };
  const [selected11, setSelected11] = useState(true);
  const handleSelect11 = () => {
    setSelected11(prev => !prev);
  };
  const [selected17, setSelected17] = useState(true);
  const handleSelect17 = () => {
    setSelected17(prev => !prev);
  };
  const [selected35, setSelected35] = useState(true);
  const handleSelect35 = () => {
    setSelected35(prev => !prev);
  };

  const [selectedMaxBet, setSelectedMaxBet] = useState("50");
  const handleMaxBetSelect = (value) => {
    setSelectedMaxBet(value);
  };
  const [selectedMinBet, setSelectedMinBet] = useState("1");
  const handleMinBetSelect = (value) => {
    setSelectedMinBet(value);
  };

  return (
    <View style={styles.container}>
        <>
          <>
            <Text style={styles.radioLegend}>Select number:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonFirst, selected5 && styles.selectedButton]} onPress={() => handleSelect5()}>
                <Text style={[styles.radioButtonText, selected5 && styles.selectedRadioButtonText]}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected8 && styles.selectedButton]} onPress={() => handleSelect8()}>
                <Text style={[styles.radioButtonText, selected8 && styles.selectedRadioButtonText]}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected11 && styles.selectedButton]} onPress={() => handleSelect11()}>
                <Text style={[styles.radioButtonText, selected11 && styles.selectedRadioButtonText]}>11</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected17 && styles.selectedButton]} onPress={() => handleSelect17()}>
                <Text style={[styles.radioButtonText, selected17 && styles.selectedRadioButtonText]}>17</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonLast, selected35 && styles.selectedButton]} onPress={() => handleSelect35()}>
                <Text style={[styles.radioButtonText, selected35 && styles.selectedRadioButtonText]}>35</Text>
              </TouchableOpacity>
            </View>
          </>
          <>
            <Text style={styles.radioLegend}>Select min:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonFirst, selectedMinBet === "1" && styles.selectedButton]} onPress={() => handleMinBetSelect("1")}>
                <Text style={[styles.radioButtonText, selectedMinBet === "1" && styles.selectedRadioButtonText]}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selectedMinBet === "5" && styles.selectedButton]} onPress={() => handleMinBetSelect("5")}>
                <Text style={[styles.radioButtonText, selectedMinBet === "5" && styles.selectedRadioButtonText]}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonLast, selectedMinBet === "25" && styles.selectedButton]} onPress={() => handleMinBetSelect("25")}>
                <Text style={[styles.radioButtonText, selectedMinBet === "25" && styles.selectedRadioButtonText]}>25</Text>
              </TouchableOpacity>
            </View>
          </>
          <>
            <Text style={styles.radioLegend}>Select max:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonFirst, selectedMaxBet === "50" && styles.selectedButton]} onPress={() => handleMaxBetSelect("50")}>
                <Text style={[styles.radioButtonText, selectedMaxBet === "50" && styles.selectedRadioButtonText]}>50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selectedMaxBet === "200" && styles.selectedButton]} onPress={() => handleMaxBetSelect("200")}>
                <Text style={[styles.radioButtonText, selectedMaxBet === "200" && styles.selectedRadioButtonText]}>200</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonLast, selectedMaxBet === "500" && styles.selectedButton]} onPress={() => handleMaxBetSelect("500")}>
                <Text style={[styles.radioButtonText, selectedMaxBet === "500" && styles.selectedRadioButtonText]}>500</Text>
              </TouchableOpacity>
            </View>
          </>
        </>
      <TouchableOpacity style={[styles.startButton]} onPress={handleNavigateToTest}>
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
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#29648a",
    borderRightWidth: 0,
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
    borderLeftColor: "#29648a",
  },
  radioButtonLast: {
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    borderRightWidth: 1,
    borderRightColor: "#29648a",
  },
  selectedButton: {
    backgroundColor: "#29648a",
    borderColor: '#fff',
    borderTopColor: "#29648a",
    borderBottomColor: "#29648a"
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

export default MultiplicationTable;
