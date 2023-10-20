import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function CardNeighbour({ number, index, onSubmit, otherNumbers }) {
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

  const getRandomRotation = () => {
    return Math.random() * (5 - -5) - 5; // Генерируем случайное значение от -5 до 5
  };

  useEffect(() => {
    setSelectedOptions([])

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
  }, [onSubmit]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={{ textAlign: "center", fontSize: 14, color: "#fff" }}> </Text>
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
        <View style={styles.keyboardContainerRow}>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[0])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[0])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[0])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[0]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[1])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[1])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[1])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[1]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[2])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[2])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[2])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[2]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[3])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[3])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[3])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[3]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[4])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[4])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[4])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[4]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardContainerRow}>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[5])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[5])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[5])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[5]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[6])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[6])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[6])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[6]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[7])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[7])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[7])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[7]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[8])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[8])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[8])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[8]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(shuffledFinalOptions[9])
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[9])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[9])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[9]}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardContainerRow}>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(
                shuffledFinalOptions[10]
              )
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[10])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[10])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[10]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(
                shuffledFinalOptions[11]
              )
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[11])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[11])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[11]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(
                shuffledFinalOptions[12]
              )
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[12])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[12])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[12]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(
                shuffledFinalOptions[13]
              )
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[13])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[13])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[13]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.optionKey,
              backgroundColor: selectedOptions.includes(
                shuffledFinalOptions[14]
              )
                ? "#29648a"
                : "#ccc",
            }}
            onPress={() => handleOptionPress(shuffledFinalOptions[14])}
          >
            <Text
              style={{
                ...styles.optionKeyText,
                color: selectedOptions.includes(shuffledFinalOptions[14])
                  ? "#fff"
                  : "#000",
              }}
            >
              {shuffledFinalOptions[14]}
            </Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity
            onPress={() => onSubmit(selectedOptions)}
            style={{ ...styles.optionKey, ...styles.optionKeySubmit }}
          >
            <Text style={{...styles.optionKeyText, color: "#fff"}}>CONFIRM</Text>
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
    flex: 1
  },
  keyboardContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
  },
  keyboardContainerRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 13,
    height: 50,
  },
  optionKey: {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 3
  },
  optionKeySubmit: {
    flex: 1,
    height: 50,
    width: '60%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#479761",
    marginBottom: 13,
  },
  optionKeyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#29648a",
    borderRadius: 5,
    padding: 5,
    width: "90%",
    backgroundColor: "#29648a",
    transform: [{ scale: 0.9 }],
  },
});

export default CardNeighbour;
