import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import saveActionLog from "../functions/saveActionLog";

const RegistrationComponent = ({setIsRegistering, isRegistering}) => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
    firstName: "",
    lastName: "",
  });

  async function checkIfUserExists(username) {
    try {
      const response = await Axios.get(
        // `https://caapp-server.onrender.com/userExists?username=${username}`
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/userExists?username=${username}`
      );
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false; // В случае ошибки также считаем, что пользователь не существует
    }
  }

  async function checkIfEmailExists(email) {
    try {
      const response = await Axios.get(
        // `https://caapp-server.onrender.com/emailExists?email=${email}`
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/emailExists?email=${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false; // В случае ошибки также считаем, что пользователь не существует
    }
  }

  const handleInputChange = async (field, value) => {
    if (field === "username") {
      setErrors({
        ...errors,
        userExists: "",
        usernameLong: "",
        isUsernameValid: "",
      });
    }
    if (field === "firstName") {
      setErrors({ ...errors, isFirstnameValid: "" });
    }
    if (field === "lastName") {
      setErrors({ ...errors, isLastnameValid: "" });
    }
    if (field === "email") {
      setErrors({ ...errors, emailTaken: "", invalidEmail: "" });
    }
    if (field === "password") {
      setErrors({ ...errors, passwordMatch: "", passwordLong: "" });
    }
    if (field === "confirmPassword") {
      setErrors({ ...errors, passwordMatch: "" });
    }
    setFormData({ ...formData, [field]: value });
  };

  const isEmailValid = (email) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordMatch = (pass, confirmPass) => {
    return pass === confirmPass;
  };

  const isLatinAndDigits = /^[a-zA-Z0-9]+$/;

  const [errors, setErrors] = useState({
    userExists: "",
    emailTaken: "",
    invalidEmail: "",
    passwordMatch: "",
    isFormFilled: "",
    usernameLong: "",
    passwordLong: "",
    isUsernameValid: "",
    isFirstnameValid: "",
    isLastnameValid: "",
  });

  const handleRegister = async () => {
    const userExists = await checkIfUserExists(formData.username);
    const usernameLong = (await formData.username.length) >= 3;
    const passwordLong = (await formData.password.length) >= 8;
    const firstNameLen = (await formData.firstName.length) > 0;
    const lastNameLen = (await formData.lastName.length) > 0;

    const isUsernameValid = await isLatinAndDigits.test(formData.username);
    const isFirstnameValid = await isLatinAndDigits.test(formData.firstName);
    const isLastnameValid = await isLatinAndDigits.test(formData.lastName);

    const emailTaken = await checkIfEmailExists(formData.email);
    const username = await formData.username;
    const email = await formData.email;
    const isMailValid = await isEmailValid(formData.email);
    const password = await formData.password;
    const confirmPassword = await formData.confirmPassword;
    const agree = await formData.agree;
    const passMatch = await passwordMatch(
      formData.password,
      formData.confirmPassword
    );

    if (userExists) {
      setErrors({
        ...errors,
        userExists: "This username is taken",
      });
      return;
    }

    if (!isUsernameValid) {
      setErrors({
        ...errors,
        isUsernameValid: "Only Latin alphabet letters and numbers are allowed",
      });
      return;
    }

    if (firstNameLen && !isFirstnameValid) {
      setErrors({
        ...errors,
        isFirstnameValid: "Only Latin alphabet letters and numbers are allowed",
      });
      return;
    }

    if (lastNameLen && !isLastnameValid) {
      setErrors({
        ...errors,
        isLastnameValid: "Only Latin alphabet letters and numbers are allowed",
      });
      return;
    }

    if (!usernameLong) {
      setErrors({ ...errors, usernameLong: "At least 3 characters" });
      return;
    }

    if (emailTaken) {
      setErrors({
        ...errors,
        emailTaken: "This E-mail has already been registered",
      });
      return;
    }

    if (!isMailValid) {
      setErrors({
        ...errors,
        invalidEmail: "Incorrect format of e-mail address",
      });
      return;
    }

    if (!passwordLong) {
      setErrors({ ...errors, passwordLong: "At least 8 characters" });
      return;
    }

    if (!passMatch) {
      setErrors({ ...errors, passwordMatch: "Passwords don't match" });
      return;
    }

    if (!username || !email || !password || !confirmPassword || !agree) {
      setErrors({ ...errors, isFormFilled: "Fill in all required fields" });
      return;
    }

    try {
      const response = await Axios.post(
        // "https://caapp-server.onrender.com/register",
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/register",
        formData
      );
      
      saveActionLog('newRegistration', username, `Пользователь зарегистрирован`);
      
      login(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={[styles.textHeader]}>Registration</Text>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            Username <Text style={styles.asterix}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.userExists ? "red" : "#29648a",
            }}
            value={formData.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
          {errors && errors.userExists ? (
            <Text style={styles.error}>
              This username is taken
            </Text>
          ) : null}
          {errors && errors.usernameLong ? (
            <Text style={styles.error}>At least 3 characters</Text>
          ) : null}
          {errors && errors.isUsernameValid ? (
            <Text style={styles.error}>
              Only Latin alphabet letters and numbers are allowed
            </Text>
          ) : null}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
          />
          {errors && errors.isFirstnameValid ? (
            <Text style={styles.error}>
              Only Latin alphabet letters and numbers are allowed
            </Text>
          ) : null}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
          />
          {errors && errors.isLastnameValid ? (
            <Text style={styles.error}>
              Only Latin alphabet letters and numbers are allowed
            </Text>
          ) : null}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            E-mail <Text style={styles.asterix}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor:
                (errors && errors.emailTaken) || errors.invalidEmail
                  ? "red"
                  : "#29648a",
            }}
            value={formData.email}
            textContentType="emailAddress"
            onChangeText={(text) => handleInputChange("email", text)}
          />
          {errors && errors.emailTaken ? (
            <Text style={styles.error}>This E-mail has already been registered</Text>
          ) : null}
          {errors && errors.invalidEmail ? (
            <Text style={styles.error}>Incorrect format of e-mail address</Text>
          ) : null}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            Password <Text style={styles.asterix}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.passwordLong || errors.passwordMatch ? "red" : "#29648a",
            }}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
          />
          {errors && errors.passwordLong ? (
            <Text style={styles.error}>At least 8 characters</Text>
          ) : null}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            Repeat password <Text style={styles.asterix}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.passwordMatch ? "red" : "#29648a",
            }}
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            secureTextEntry
          />
          {errors && errors.passwordMatch ? (
            <Text style={styles.error}>Passwords don't match</Text>
          ) : null}
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
            I agree with the processing of personal data{" "}
            <Text style={styles.asterix}>*</Text>
          </Text>
        </View>

        {errors && errors.isFormFilled ? (
          <Text style={styles.error}>Fill in all required fields</Text>
        ) : null}

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
            SIGN UP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.toggleButton}>
            {isRegistering
              ? "Have an account? Log in"
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    // height: Dimensions.get("window").height - 130,
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
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 20
  },
  error: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
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
  asterix: {
    color: "red",
    fontSize: 18,
  },
  toggleButton: {
    color: "#808080",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default RegistrationComponent;
