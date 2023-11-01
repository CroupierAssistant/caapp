import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea}>
        <AuthProvider >
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
    backgroundColor: '#29648a', // Цвет фона вокруг SafeAreaView
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
