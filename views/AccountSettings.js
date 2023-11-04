// AccountSettings.js

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AccountSettings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isShowData, setIsShowData] = useState(user.showUserData); 
  
  const handleInputChange = () => {
    setIsShowData(prev => !prev)
  }

  const handleChangeSettings = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Пароли не совпадают");
      return;
    }

    try {
      const response = await axios.post(
        "https://caapp-server.onrender.com/change-settings",
        {
          username: user.username,
          currentPassword,
          newPassword,
          showUserData: isShowData
        }
      );

      if (response.data.success) {
        await updateUser({ ...user, password: newPassword, showUserData: isShowData });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        Alert.alert("Success", "Account settings changed successfully");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while changing account settings");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Change password</Text>
      <View style={styles.labelContainer}>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current password"
          secureTextEntry
        />
      </View>
      <View style={styles.labelContainer}>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
          secureTextEntry
        />
      </View>
      <View style={styles.labelContainer}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          secureTextEntry
        />
      </View>

      <View style={styles.lineBreak} />

      <Text style={styles.label}>Profile visibility</Text>
      <Text style={styles.explanationText}>This option allows other users to see your profile information (Your name and lastname, birthday, work expirience etc.)</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => handleInputChange()}>
          <View style={styles.checkbox}>
        {isShowData && <View style={styles.checkboxInner} />} 
          </View>
        </TouchableOpacity>
        <Text
          onPress={() => handleInputChange()}
          style={styles.checkboxLabel}
        >
          Show personal information to other users
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeSettings}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  labelContainer: {
    marginBottom: 10,
    width: "100%",
  },
  label: {
    color: "#29648a",
    fontSize: 20,
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 25,
    backgroundColor: "#29648a",
    borderRadius: 3,
    width: 200,
    padding: 10,
  },
  lineBreak: {
    marginVertical: 15,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
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
  explanationText: {
    color: "#777",
    fontSize: 14,
    width: "100%",
  },
});

export default AccountSettings;
