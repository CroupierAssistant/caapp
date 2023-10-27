import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const AuthorizationComponent = ({setIsRegistering, isRegistering}) => {
  const { login, logout, user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    checkbox: false,
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleLogin = () => {
    // Axios.post("http://192.168.31.124:3000/login", {
    Axios.post("https://caapp-server.onrender.com/login", {
      username: formData.username,
      password: formData.password,
    })
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        AsyncStorage.setItem("token", token);
        login(response.data.user); // Добавление в контекст после успешной авторизации
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
        setError(null);
        console.log(response.data.user);
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          if (error.response.status === 401) {
            setError("User not found or password entered incorrectly");
          } else {
            setError("The request failed. Check the entered data.");
          }
        } else if (error.request) {
          setError("No response from server");
        } else {
          setError("An error has occurred");
        }
      });
  };

  return (
    <>
      <Text style={[styles.textHeader]}>Sign in</Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleInputChange("username", text)}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={{
          marginVertical: 15,
          backgroundColor: "#29648a",
          borderRadius: 3,
          width: 200,
          padding: 10,
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleButton}>
          {isRegistering
            ? "Have an account? Log in"
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: Dimensions.get("window").height - 130,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  mainContainer: {
    backgroundColor: "#29648a",
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: "#808080",
    fontSize: 16,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
  errorText: {
    color: "#a16e83",
    fontSize: 16,
    textAlign: "center",
  },
  toggleButton: {
    color: "#808080",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default AuthorizationComponent;
