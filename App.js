import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./navigation/MainTabNavigator";
import { StyleSheet, SafeAreaView } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { PicturesProvider } from "./context/PicturesContext";

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <PicturesProvider>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </PicturesProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
