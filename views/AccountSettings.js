// AccountSettings.js

import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AccountSettings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Пароли не совпадают");
      return;
    }

    console.log(user);

    try {
      const response = await axios.post(
        "https://caapp-server.onrender.com/change-password",
        {
          username: user.username,
          currentPassword,
          newPassword,
        }
      );

      if (response.data.success) {
        updateUser({ ...user, password: newPassword });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        Alert.alert("Success", "Password changed successfully");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while changing password");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Смена пароля</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Текущий пароль"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Новый пароль"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder="Подтвердите новый пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Изменить пароль" onPress={handleChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default AccountSettings;
