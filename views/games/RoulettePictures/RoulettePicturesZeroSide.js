import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function RoulettePicturesZeroSide({handleAddPayout}) {

  const [firstFour, setFirstFour] = useState(false);
  const [rightSL, setRightSL] = useState(false);
  const [street, setStreet] = useState(false);
  const [straightUp, setStraightUp] = useState(false);

  const [topLeftStreet, setTopLeftStreet] = useState(false);
  const [topRightCorner, setTopRightCorner] = useState(false);

  const [topSplit, setTopSplit] = useState(false);
  const [leftSplit, setLeftSplit] = useState(false);
  const [rightSplit, setRightSplit] = useState(false);

  const [chipCount, setChipCount] = useState(20);
  const [betsArray, setBetsArray] = useState([]);
  const [payout, setPayout] = useState(0)

  const chipValues = {
    firstFour: firstFour,
    rightSL: rightSL,
    street: street,
    straightUp: straightUp,
    topLeftStreet: topLeftStreet,
    topRightCorner: topRightCorner,
    topSplit: topSplit,
    leftSplit: leftSplit,
    rightSplit: rightSplit,
  };

  const coefficients = {
    firstFour: 8,
    rightSL: 5,
    street: 11,
    straightUp: 35,
    topLeftStreet: 11,
    topRightCorner: 8,
    topSplit: 17,
    leftSplit: 17,
    rightSplit: 17,
  };

  function generateRandomArray(randomTrueCount, totalSum) {
    var n = randomTrueCount;
    var m = totalSum;

    var randomNumbers = [];
    var sum = 0;
    for (var i = 0; i < n - 1; i++) {
      var randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * (m - sum - (n - i - 1))) + 1; // Исключаем 0 и учитываем оставшуюся сумму
      } while (randomNumber > m / 5);

      randomNumbers.push(randomNumber);
      sum += randomNumber;
    }
    if (m - sum <= m / 5) {
      randomNumbers.push(m - sum);
    } else {
      var newLastNumber = m / 5;
      randomNumbers.push(newLastNumber);
      sum += newLastNumber;
      var newSpanOne = Math.floor((m - sum) / 2);
      var newSpanTwo = Math.ceil((m - sum) / 2);

      let sortedNumbers = randomNumbers.sort((a, b) => a - b);
      sortedNumbers[0] += newSpanTwo;
      sortedNumbers[1] += newSpanOne;

      randomNumbers = sortedNumbers.sort(() => Math.random() - 0.5);
    }

    return randomNumbers;
  }

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const states = [
      setFirstFour,
      setRightSL,
      setStreet,
      setStraightUp,
      setTopLeftStreet,
      setTopRightCorner,
      setTopSplit,
      setLeftSplit,
      setRightSplit,
    ];

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const randomTrueCount = randomInt(4, 9);
    const shuffledStates = shuffleArray([...states]);

    for (let i = 0; i < randomTrueCount; i++) {
      shuffledStates[i](true);
    }

    setBetsArray(generateRandomArray(randomTrueCount, chipCount));
  }, []);

  const activeChips = Object.keys(chipValues).filter((ch) => chipValues[ch]);

  useEffect(() => {
    let totalPayout = 0; // Создаем переменную для хранения суммы

    activeChips.forEach((ch, index) => {
      totalPayout += betsArray[index] * coefficients[ch]; // Считаем выплату
    });

    setPayout(totalPayout, () => {
      handleAddPayout('ok');
    });
  }, [activeChips, betsArray]); // Обновляем сумму при изменении активных фишек или суммы ставок

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <View style={styles.topBorder}></View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={{...styles.cell, ...styles.cellZeroTop}}><Text style={{...styles.numberLabel, ...styles.numberRed}}> </Text></View>
            <View style={{...styles.cell, ...styles.cellWin}}><Text style={{...styles.numberLabel, ...styles.numberRed}}>3</Text></View>
            <View style={styles.cell}><Text style={{...styles.numberLabel, ...styles.numberBlack}}>6</Text></View>
          </View>
          <View style={styles.row}>
            <View style={{...styles.cell, ...styles.cellZero}}><Text style={{...styles.numberLabel, ...styles.numberGreen}}>0</Text></View>
            <View style={styles.cell}><Text style={{...styles.numberLabel, ...styles.numberBlack}}>2</Text></View>
            <View style={styles.cell}><Text style={{...styles.numberLabel, ...styles.numberRed}}>5</Text></View>
          </View>
          <View style={styles.row}>
            <View style={{...styles.cell, ...styles.cellZeroBottom}}><Text style={{...styles.numberLabel, ...styles.numberRed}}> </Text></View>
            <View style={styles.cell}><Text style={{...styles.numberLabel, ...styles.numberRed}}>1</Text></View>
            <View style={styles.cell}><Text style={{...styles.numberLabel, ...styles.numberBlack}}>4</Text></View>
          </View>
        </View>

        {
        activeChips.map((ch, index) => {
          return (
            <View style={[styles.chip, styles[ch]]} key={index}>
              <Text style={styles.chipBet}>{betsArray[index]}</Text>
            </View>
          );
        })}
      </View>
    <Text style={{marginTop: 30}}>{payout}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainer: {
    width: 239,
    height: 239,
  },
  topBorder: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 4,
    width: 160,
    marginLeft: 79
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cellZeroTop: {
    borderBottomWidth: 0
  },
  cellZeroBottom: {
    borderTopWidth: 0
  },
  cellZero: {
    borderBottomWidth: 0,
    borderTopWidth: 0
  },
  cellWin: {
    backgroundColor: '#9b9fd5'
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  chip: {
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    position: "absolute",
    borderWidth: 3,
    borderColor: "rgb(131, 30, 30)",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(173, 50, 50)",
    borderRadius: 30
  },
  chipBet: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center'
  },
  firstFour: {
    left: 60,
    top: -15,
  },
  rightSL: {
    left: 140,
    top: -15,
  },
  street: {
    left: 100,
    top: -15,
  },
  topLeftStreet: {
    left: 60,
    top: 62,
  },
  topRightCorner: {
    left: 140,
    top: 62,
  },
  bottomLeftStreet: {
    left: 60,
    top: 142,
  },
  bottomRightCorner: {
    left: 140,
    top: 142,
  },
  topSplit: {
    left: 100,
    top: 62,
  },
  leftSplit: {
    left: 60,
    top: 23,
  },
  rightSplit: {
    left: 140,
    top: 23,
  },
  bottomSplit: {
    left: 100,
    top: 142,
  },
  straightUp: {
    left: 100,
    top: 23,
  },
  numberLabel: {
    fontSize: 40,
    position: 'absolute',
    fontWeight: 'bold',
    top: '50%',
    left: '50%',
    // lineHeight: 40, 
    transform: [{ rotate: '270deg' }, { translateX: 23 }, { translateY: -12 }]   
  },
  numberRed: {
    color: 'rgb(245, 0, 0)'
  },
  numberBlack: {
    color: 'rgb(0, 0, 0)'
  },
  numberGreen: {
    color: 'rgb(0, 128, 0)'
  },
});

export default RoulettePicturesZeroSide;
