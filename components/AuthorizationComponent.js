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

const AuthorizationComponent = () => {
  const { login, logout, user } = useContext(AuthContext);
  const [error, setError] = useState([]);
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
    borderTopWidth: 2,
    borderTopColor: "#29648a",
    height: Dimensions.get("window").height - 130,
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
    color: "#a16e83",
    fontSize: 12,
  },
  errorText: {
    color: "#a16e83",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AuthorizationComponent;
