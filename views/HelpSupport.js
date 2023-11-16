import React, { useContext } from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
const HelpSupport = () => {
  const { user } = useContext(AuthContext);
  const userName = user.username || "User";

  const sendEmail = async () => {
    try {
      await Linking.openURL(
        "mailto:croupierassistant@gmail.com?subject=Feedback"
      );
    } catch (error) {
      console.error("Ошибка при открытии почтового приложения:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>Dear {userName},</Text>
      <Text style={[styles.text]}>
        I appreciate your usage of my application.
      </Text>
      <Text style={[styles.text]}>
        If you have any feedback, suggestions for improvement, or would like to
        report a bug, please feel free to reach out to me at
        croupierassistant@gmail.com.
      </Text>
      <Text style={[styles.text]}>Thank you for your valuable input!</Text>
      <Text style={[styles.text]}>Sincerely, Pavlo Zorin</Text>
      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Send E-mail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    color: "#29648a",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#29648a",
    borderRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HelpSupport;
