import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function RoulettePictures() {
  const navigation = useNavigation();

  const handleNavigateToTest = () => {
    const isAnyCombinationSelected = selected10 || selected20 || selected30 || selected40 || selected50 || selected60;
    const isAnyNumberSelected = selected0 || selected2 || selected3 || selected5 || selected6;
  
    if (isAnyCombinationSelected && isAnyNumberSelected) {
      navigation.navigate("RoulettePicturesTest", {
        mode: "sandbox",
        amountOfCards: 50,
        splitCoeff: false,
        timeLimit: 600000,
        gameName: 'Roulette pictures',
        combinations: { 
          selected10: selected10,
          selected20: selected20,
          selected30: selected30,
          selected40: selected40,
          selected50: selected50,
          selected60: selected60,
        },
        numbers: {
          selected0: selected0,
          selected2: selected2,
          selected3: selected3,
          selected5: selected5,
          selected6: selected6,
        },
      });
    }
  };
  

  const [selected10, setSelected10] = useState(true);
  const handleSelect10 = () => {
    setSelected10(prev => !prev);
  };
  const [selected20, setSelected20] = useState(true);
  const handleSelect20 = () => {
    setSelected20(prev => !prev);
  };
  const [selected30, setSelected30] = useState(false);
  const handleSelect30 = () => {
    setSelected30(prev => !prev);
  };
  const [selected40, setSelected40] = useState(false);
  const handleSelect40 = () => {
    setSelected40(prev => !prev);
  };
  const [selected50, setSelected50] = useState(false);
  const handleSelect50 = () => {
    setSelected50(prev => !prev);
  };
  const [selected60, setSelected60] = useState(false);
  const handleSelect60 = () => {
    setSelected60(prev => !prev);
  };

  const [selected0, setSelected0] = useState(true);
  const handleSelect0 = () => {
    setSelected0(prev => !prev);
  };
  const [selected2, setSelected2] = useState(true);
  const handleSelect2 = () => {
    setSelected2(prev => !prev);
  };
  const [selected3, setSelected3] = useState(true);
  const handleSelect3 = () => {
    setSelected3(prev => !prev);
  };
  const [selected5, setSelected5] = useState(true);
  const handleSelect5 = () => {
    setSelected5(prev => !prev);
  };
  const [selected6, setSelected6] = useState(true);
  const handleSelect6 = () => {
    setSelected6(prev => !prev);
  };

  return (
    <View style={styles.container}>
        <>
          <>
            <Text style={styles.radioLegend}>Select amount of chips:</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonFirst, selected10 && styles.selectedButton]} onPress={() => handleSelect10()}>
                <Text style={[styles.radioButtonText, selected10 && styles.selectedRadioButtonText]}>10</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected20 && styles.selectedButton]} onPress={() => handleSelect20()}>
                <Text style={[styles.radioButtonText, selected20 && styles.selectedRadioButtonText]}>20</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={true} style={[styles.radioButton, selected30 && styles.selectedButton]} onPress={() => handleSelect30()}>
                <Text style={[styles.radioButtonText, selected30 && styles.selectedRadioButtonText]}>30</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={true} style={[styles.radioButton, selected40 && styles.selectedButton]} onPress={() => handleSelect40()}>
                <Text style={[styles.radioButtonText, selected40 && styles.selectedRadioButtonText]}>40</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={true} style={[styles.radioButton, selected50 && styles.selectedButton]} onPress={() => handleSelect50()}>
                <Text style={[styles.radioButtonText, selected50 && styles.selectedRadioButtonText]}>50</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={true} style={[styles.radioButton, styles.radioButtonLast, selected60 && styles.selectedButton]} onPress={() => handleSelect60()}>
                <Text style={[styles.radioButtonText, selected60 && styles.selectedRadioButtonText]}>60</Text>
              </TouchableOpacity>
            </View>
          </>
          <>
            <Text style={styles.radioLegend}>Select number:</Text>
            <View style={styles.radioContainer}>
            <TouchableOpacity style={[styles.radioButton, styles.radioButtonFirst, selected0 && styles.selectedButton]} onPress={() => handleSelect0()}>
                <Text style={[styles.radioButtonText, selected0 && styles.selectedRadioButtonText]}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected2 && styles.selectedButton]} onPress={() => handleSelect2()}>
                <Text style={[styles.radioButtonText, selected2 && styles.selectedRadioButtonText]}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected3 && styles.selectedButton]} onPress={() => handleSelect3()}>
                <Text style={[styles.radioButtonText, selected3 && styles.selectedRadioButtonText]}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, selected5 && styles.selectedButton]} onPress={() => handleSelect5()}>
                <Text style={[styles.radioButtonText, selected5 && styles.selectedRadioButtonText]}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, styles.radioButtonLast, selected6 && styles.selectedButton]} onPress={() => handleSelect6()}>
                <Text style={[styles.radioButtonText, selected6 && styles.selectedRadioButtonText]}>6</Text>
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
    // paddingHorizontal: 20,
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

export default RoulettePictures;
