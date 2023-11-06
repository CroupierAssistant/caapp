import React, { useState, useEffect, useMemo } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function CardNeighbour({ number, index, onSubmit, otherNumbers, onSkip, mode }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shuffledFinalOptions, setShuffledFinalOptions] = useState([]);

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      if (selectedOptions.length < 4) {
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  useEffect(() => {
    setSelectedOptions([]);

    const shuffledOtherNumbers = [...otherNumbers].sort(
      () => Math.random() - 0.5
    );
    const allOptions = [
      number[0],
      number[1],
      number[3],
      number[4],
      ...shuffledOtherNumbers,
    ];
    const finalOptions = allOptions.slice(0, 15);
    setShuffledFinalOptions([...finalOptions].sort(() => Math.random() - 0.5));
  }, [number]);

  const renderOptions = useMemo(() => {
    return shuffledFinalOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={{
          ...styles.optionKey,
          backgroundColor: selectedOptions.includes(option)
            ? "#29648a"
            : "#ccc",
        }}
        onPress={() => handleOptionPress(option)}
      >
        <Text
          style={{
            ...styles.optionKeyText,
            color: selectedOptions.includes(option) ? "#fff" : "#000",
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));
  }, [selectedOptions, shuffledFinalOptions]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={{ textAlign: "center", fontSize: 14, color: "#fff" }}>
          {" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 68,
            fontWeight: "bold",
            marginVertical: 15,
            color: "#fff",
          }}
        >
          {number[2]}
        </Text>
        <Text style={{ textAlign: "right", fontSize: 14, color: "#fff" }}>
          {index}
        </Text>
      </View>

      <View style={styles.keyboardContainer}>
        <View style={styles.keyboardContainerRow}>{renderOptions}</View>
        <TouchableOpacity
          onPress={() =>
            mode === "timelimit" && selectedOptions.length || mode === "sandbox"
              ? onSubmit(selectedOptions)
              : onSkip()
          }
          style={{
            ...styles.optionKeySubmit,
            backgroundColor: selectedOptions.length ? "#479761" : "#a16e83",
          }}
        >
          <Text style={{ ...styles.optionKeyText, color: "#fff" }}>
            {selectedOptions.length ? "CONFIRM" : "SKIP"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "100%",
    flex: 1,
  },
  keyboardContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 0,
    // position: 'absolute',
    // bottom: 0,
  },
  keyboardContainerRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    height: 170,
  },
  optionKey: {
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
  optionKeySubmit: {
    height: 50,
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 3,
  },
  optionKeyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#29648a",
    borderRadius: 3,
    padding: 5,
    width: "90%",
    backgroundColor: "#29648a",
    // transform: [{ scale: 0.9 }],
  },
});

export default CardNeighbour;
