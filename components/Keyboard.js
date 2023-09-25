import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const Keyboard = ({ onKeyboardPress, handleInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (value) => {
    if (value === "DEL") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (value === ".") {
      setInputValue((prev) => (prev.includes(".") ? prev : prev + value));
    } else if (value === "OK") {
      // Ваша логика для обработки нажатия "Ok"
      handleInputChange(inputValue)
      onKeyboardPress("submit")
      setInputValue("")
    } else {
      setInputValue((prev) => prev + value);
    }
  };

  return (
    <View style={styles.keyboard}>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="0" value={inputValue} editable={false} />
        </View>
        <TouchableOpacity
          style={styles.delButton}
          onPress={() => handleKeyPress("DEL")}
        >
          <Text style={styles.buttonText}>DEL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(1)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(2)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(3)}
        >
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(4)}
        >
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(5)}
        >
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(6)}
        >
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(7)}
        >
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(8)}
        >
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(9)}
        >
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(".")}
        >
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => handleKeyPress(0)}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => handleKeyPress("OK")}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    position: "absolute",
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: 'space-between',
    rowGap: 5
  },
    inputContainer: {
      flex: 1,
    },
  input: {
    // width: "66%",
    height: 50,
    backgroundColor: "#eee",
    borderRadius: 2,
    paddingHorizontal: 10,
    fontSize: 30,
    textAlign: 'right'
  },
  inputButton: {
    width: "32%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    // margin: 5,
    borderRadius: 2,
  },
  delButton: {
    width: "32%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF5722",
    // margin: 5,
    borderRadius: 2,
  },
  okButton: {
    width: "32%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    // margin: 5,
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'space-between'
  },
});

export default Keyboard;
