import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Paytable = ({ combinations, splitCoeff }) => {
  return (
    <View style={styles.container}>
      {combinations.map((combination, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.name}>{combination.name}</Text>
          <Text style={styles.coeff}>{splitCoeff ? combination.coeff / 2 : combination.coeff} to 1</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    borderBottomColor: '#19181a',
    borderBottomWidth: 1,
    paddingVertical: 3
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coeff: {
    fontSize: 16,
  },
});

export default Paytable;
