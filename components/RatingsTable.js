import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const RatingsTable = ({ ratings }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ratings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{index + 1}</Text>
            <Text style={styles.text}>{item.username}</Text>
            <Text style={styles.text}>{item.percentage}</Text>
            <Text style={styles.text}>{item.timeSpentTest}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
});

export default RatingsTable;
