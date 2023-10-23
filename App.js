import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea}>
        <AuthProvider>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // Цвет фона вокруг SafeAreaView
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
