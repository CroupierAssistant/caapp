import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const SubscriptionManagement = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textHeader]}>Subscription Management</Text>
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

export default SubscriptionManagement;
