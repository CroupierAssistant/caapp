import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const Keyboard = ({ onKeyboardPress, handleInputChange, mode }) => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useContext(AuthContext);

  const keyboardPosition = user && user.keyboardPosition || 'center'

  const handleKeyPress = (value) => {
    if (value === "DEL") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (value === ".") {
      setInputValue((prev) => (prev.includes(".") ? prev : prev + value));
    } else if (value === "OK") {
      handleInputChange(inputValue);
      onKeyboardPress("submit");
      setInputValue("");
    } else if (value === "SKIP") {
      onKeyboardPress("skip");
    } else {
      setInputValue((prev) => prev + value);
    }
  };

  return (
    <View style={{...styles.keyboard, alignItems: keyboardPosition,}}>
      <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "space-between",}}>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="0"
              value={inputValue}
              editable={false}
            />
          </View>
          <TouchableOpacity
            style={styles.delButton}
            onPress={() => handleKeyPress("DEL")}
          >
            <Ionicons name="backspace-outline" size={30} color="white" />
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
        <View style={{...styles.row, borderBottomWidth: 0}}>
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
            style={{
              ...styles.okButton,
              backgroundColor: inputValue ? "#479761" : "#a16e83",
            }}
            onPress={() =>
              handleKeyPress(
                mode === "timelimit" && inputValue
                  ? "OK"
                  : mode === "sandbox"
                  ? "OK"
                  : "SKIP"
              )
            }
          >
            <Text style={styles.buttonText}>{inputValue ? "OK" : "SKIP"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    position: "absolute",
    bottom: 2,
    left: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get('window').height * 0.35,
    maxHeight: 250,
    backgroundColor: "#29648a",
  },
  row: {
    width: "100%",
    maxWidth: 300,
    height: "20%",
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: 'space-between',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  inputContainer: {
    height: "100%",
    width: "66%",
    borderRightWidth: 1,   
    borderRightColor: '#fff',
    borderLeftWidth: 1,   
    borderLeftColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 24,
    textAlign: "right",
    color: "#000",
  },
  delButton: {
    height: "100%",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#999",
    borderRightWidth: 1,   
    borderRightColor: '#fff',
    borderLeftWidth: 1,   
    borderLeftColor: '#fff',
  },
  inputButton: {
    height: "100%",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#29648a",
    borderRightWidth: 1,   
    borderRightColor: '#fff',
    borderLeftWidth: 1,   
    borderLeftColor: '#fff',
  },
  okButton: {
    height: "100%",
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,   
    borderRightColor: '#fff',
    borderLeftWidth: 1,   
    borderLeftColor: '#fff',
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});


export default Keyboard;
