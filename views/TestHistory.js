import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TestHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>Test History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopWidth: 2,
    borderTopColor: "#29648a",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
});

export default TestHistory;
