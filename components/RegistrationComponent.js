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

const RegistrationComponent = ({setIsRegistering, isRegistering}) => {
  const { login, logout, user } = useContext(AuthContext);

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
        `https://caapp-server.onrender.com/userExists?username=${username}`
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
        `https://caapp-server.onrender.com/emailExists?email=${email}`
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
        userExists: "Пользователь с таким именем уже существует",
      });
      return;
    }

    if (!isUsernameValid) {
      setErrors({
        ...errors,
        isUsernameValid: "Разрешены только буквы латинского алфавита и цифры",
      });
      return;
    }

    if (!isFirstnameValid) {
      setErrors({
        ...errors,
        isFirstnameValid: "Разрешены только буквы латинского алфавита и цифры",
      });
      return;
    }

    if (!isLastnameValid) {
      setErrors({
        ...errors,
        isLastnameValid: "Разрешены только буквы латинского алфавита и цифры",
      });
      return;
    }

    if (!usernameLong) {
      setErrors({ ...errors, usernameLong: "Минимум 3 символа" });
      return;
    }

    if (emailTaken) {
      setErrors({
        ...errors,
        emailTaken: "Этот почтовый ящик уже зарегистрирован",
      });
      return;
    }

    if (!isMailValid) {
      setErrors({
        ...errors,
        invalidEmail: "Неверный формат адреса электронной почты",
      });
      return;
    }

    if (!passwordLong) {
      setErrors({ ...errors, passwordLong: "Минимум 8 символов" });
      return;
    }

    if (!passMatch) {
      setErrors({ ...errors, passwordMatch: "Пароли не совпадают" });
      return;
    }

    if (!username || !email || !password || !confirmPassword || !agree) {
      setErrors({ ...errors, isFormFilled: "Заполните все необходимые поля" });
      return;
    }

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
              Пользователь с таким именем уже существует
            </Text>
          ) : null}
          {errors && errors.usernameLong ? (
            <Text style={styles.error}>Минимум 3 символа</Text>
          ) : null}
          {errors && errors.isUsernameValid ? (
            <Text style={styles.error}>
              Разрешены только буквы латинского алфавита и цифры
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
              Разрешены только буквы латинского алфавита и цифры
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
              Разрешены только буквы латинского алфавита и цифры
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
            <Text style={styles.error}>Электронная почта уже занята</Text>
          ) : null}
          {errors && errors.invalidEmail ? (
            <Text style={styles.error}>Неверный формат электронной почты</Text>
          ) : null}
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            Password <Text style={styles.asterix}>*</Text>
          </Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.passwordMatch ? "red" : "#29648a",
            }}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
            secureTextEntry
          />
          {errors && errors.passwordLong ? (
            <Text style={styles.error}>Минимум 8 символов</Text>
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
            <Text style={styles.error}>Пароли не совпадают</Text>
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
          <Text style={styles.error}>Заполните все необходимые поля</Text>
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
            Register
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
