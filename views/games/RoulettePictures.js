import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function RoulettePictures() {
  const [leftSL, setLeftSL] = useState(true);
  const [rightSL, setRightSL] = useState(true);
  const [street, setStreet] = useState(true);
  const [straightUp, setStraightUp] = useState(true);

  const [topLeftCorner, setTopLeftCorner] = useState(true);
  const [topRightCorner, setTopRightCorner] = useState(true);
  const [bottomLeftCorner, setBottomLeftCorner] = useState(true);
  const [bottomRightCorner, setBottomRightCorner] = useState(true);

  const [topSplit, setTopSplit] = useState(true);
  const [leftSplit, setLeftSplit] = useState(true);
  const [rightSplit, setRightSplit] = useState(true);
  const [bottomSplit, setBottomSplit] = useState(true);
  
  return (
    <View style={styles.container}>

      <View style={styles.tableContainer}>
        <View style={styles.topBorder}></View>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
            <View style={styles.cell}></View>
          </View>
        </View>
        {leftSL && <View style={[styles.chip, styles.leftSL]}><Text style={styles.chipBet}>1</Text></View>}
        {street && <View style={[styles.chip, styles.street]}><Text style={styles.chipBet}>1</Text></View>}
        {rightSL && <View style={[styles.chip, styles.rightSL]}><Text style={styles.chipBet}>1</Text></View>}
        {straightUp && <View style={[styles.chip, styles.straightUp]}><Text style={styles.chipBet}>1</Text></View>}
        
        {topLeftCorner && <View style={[styles.chip, styles.topLeftCorner]}><Text style={styles.chipBet}>1</Text></View>}
        {topRightCorner && <View style={[styles.chip, styles.topRightCorner]}><Text style={styles.chipBet}>1</Text></View>}
        {bottomLeftCorner && <View style={[styles.chip, styles.bottomLeftCorner]}><Text style={styles.chipBet}>1</Text></View>}
        {bottomRightCorner && <View style={[styles.chip, styles.bottomRightCorner]}><Text style={styles.chipBet}>1</Text></View>}

        {topSplit && <View style={[styles.chip, styles.topSplit]}><Text style={styles.chipBet}>1</Text></View>}
        {leftSplit && <View style={[styles.chip, styles.leftSplit]}><Text style={styles.chipBet}>1</Text></View>}
        {rightSplit && <View style={[styles.chip, styles.rightSplit]}><Text style={styles.chipBet}>1</Text></View>}
        {bottomSplit && <View style={[styles.chip, styles.bottomSplit]}><Text style={styles.chipBet}>1</Text></View>}
      </View>

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
    width: 240,
    height: 240,
  },
  topBorder: {
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 2,
    width: 240,
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
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
  },
  chip: {
    position: 'absolute',
    borderRadius: '50%',
    borderWidth: 4,
    borderColor: "black",
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkred'
  },
  chipBet: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  leftSL: {
    left: 60,
    top: -15
  },
  rightSL: {
    left: 140,
    top: -15
  },
  street: {
    left: 100,
    top: -15
  },
  topLeftCorner: {
    left: 60,
    top: 62
  },
  topRightCorner: {
    left: 140,
    top: 62
  },
  bottomLeftCorner: {
    left: 60,
    top: 142
  },
  bottomRightCorner: {
    left: 140,
    top: 142
  },
  topSplit: {
    left: 100,
    top: 62
  },
  leftSplit: {
    left: 60,
    top: 102
  },
  rightSplit: {
    left: 140,
    top: 102
  },
  bottomSplit: {
    left: 100,
    top: 142
  },
  straightUp: {
    left: 100,
    top: 102
  },
});

export default RoulettePictures;
