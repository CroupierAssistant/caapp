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

const RegistrationComponent = () => {
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

  const isEmailValid = (email) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      const response = await Axios.post(
        "https://caapp-server.onrender.com/register",
        formData
      );
      login(response.data.user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          textContentType="emailAddress"
          onChangeText={(text) => handleInputChange("email", text)}
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

      <View style={styles.labelContainer}>
        <Text style={styles.label}>Repeat password</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
          secureTextEntry
        />
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => handleInputChange("agree", !formData.agree)}
        >
          <View style={styles.checkbox}>
            {formData.agree && <View style={styles.checkboxInner} />}
          </View>
        </TouchableOpacity>
        <Text
          onPress={() => handleInputChange("agree", !formData.agree)}
          style={styles.checkboxLabel}
        >
          I agree with the processing of personal data
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginVertical: 15,
          backgroundColor: "#29648a",
          borderRadius: 3,
          width: 200,
          padding: 10,
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
          Register
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderColor: "#29648a",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxInner: {
    height: 10,
    width: 10,
    backgroundColor: "#29648a",
    borderRadius: 2,
  },
  checkboxLabel: {
    color: "#555",
    fontSize: 16,
  },
  errorText: {
    color: "#a16e83",
    fontSize: 16,
    textAlign: "center",
  },
  toggleButton: {
    color: "#479761",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default RegistrationComponent;
