import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Paytable = ({ combinations, splitCoeff }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payouts</Text>
      {combinations.map((combination, index) => (
        <View key={index}>
          <View style={styles.row}>
            <Text style={styles.name}>{combination.name}</Text>
            <Text style={styles.coeff}>
              {splitCoeff ? combination.coeff / 2 : combination.coeff} to 1
            </Text>
          </View>
          {index !== combinations.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 25,
  },
  line: {
    borderBottomColor: "#19181a",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingVertical: 3,
  },
  name: {
    fontSize: 16,
  },
  coeff: {
    fontSize: 16,
  },
});

export default Paytable;
