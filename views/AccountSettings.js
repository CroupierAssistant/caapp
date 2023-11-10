// AccountSettings.js

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AccountSettings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("center");
  const [isShowData, setIsShowData] = useState(user.showUserData);

  const [errors, setErrors] = useState({
    passwordMatch: "",
    passwordLong: "",
    passwordCurrent: "",
  });

  const handleInputChange = () => {
    setIsShowData((prev) => !prev);
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const passwordMatch = (pass, confirmPass) => {
    return pass === confirmPass;
  };

  const handleChangeSettings = async () => {
    const passwordCurrent = await currentPassword;
    const passwordLong =
      (await newPassword.length) >= 8 || newPassword.length == 0;
    const passMatch = await passwordMatch(newPassword, confirmPassword);

    if (!passwordLong) {
      setErrors({ ...errors, passwordLong: "At least 8 characters" });
      return;
    }

    if (!passMatch) {
      setErrors({ ...errors, passwordMatch: "Passwords don't match" });
      return;
    }

    if ((passwordLong && passMatch && passwordCurrent) || (!newPassword && !confirmPassword && !passwordCurrent)) {
      try {
        const response = await axios.post(
          // "https://caapp-server.onrender.com/change-settings",
          "http://192.168.31.124:10000/change-settings",
          {
            username: user.username,
            currentPassword,
            newPassword,
            showUserData: isShowData,
            keyboardPosition: selectedPosition,
          }
        );
  
        if (response.data.success) {
          await updateUser({
            ...user,
            password: newPassword,
            showUserData: isShowData,
            keyboardPosition: selectedPosition,
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setErrors({
            passwordMatch: "",
            passwordLong: "",
            passwordCurrent: "",
          });
          Alert.alert("Success", "Account settings changed successfully");
        } else {
          Alert.alert("Error", response.data.message);
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while changing account settings");
      }
    } else if(passwordLong && passMatch && !passwordCurrent) {
      setErrors({ ...errors, passwordCurrent: "Enter current password" });
      return;
    } else {
      return
    }
  };

  const handleNewPasswordChange = (text) => {
    setErrors({ ...errors, passwordLong: "" });
    setNewPassword(text);
  };

  const handleCurrentPasswordChange = (text) => {
    setErrors({ ...errors, passwordCurrent: "" });
    setCurrentPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setErrors({ ...errors, passwordMatch: "" });
    setConfirmPassword(text);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Change password</Text>
        <View style={styles.labelContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.passwordCurrent ? "red" : "#29648a",
            }}
            value={currentPassword}
            onChangeText={(text) => handleCurrentPasswordChange(text)}
            placeholder="Current password"
            secureTextEntry
          />
        </View>

        {errors && errors.passwordCurrent ? (
          <Text style={styles.error}>Enter current password</Text>
        ) : null}

        <View style={styles.labelContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderColor:
                (errors && errors.passwordLong) || errors.passwordMatch
                  ? "red"
                  : "#29648a",
            }}
            value={newPassword}
            onChangeText={(text) => handleNewPasswordChange(text)}
            placeholder="New password"
            secureTextEntry
          />
        </View>

        {errors && errors.passwordLong ? (
          <Text style={styles.error}>At least 8 characters</Text>
        ) : null}

        <View style={styles.labelContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderColor: errors && errors.passwordMatch ? "red" : "#29648a",
            }}
            value={confirmPassword}
            onChangeText={(text) => handleConfirmPasswordChange(text)}
            placeholder="Confirm new password"
            secureTextEntry
          />
        </View>

        {errors && errors.passwordMatch ? (
          <Text style={styles.error}>Passwords don't match</Text>
        ) : null}

        <View style={styles.lineBreak} />

        <Text style={styles.label}>Profile visibility</Text>
        <Text style={styles.explanationText}>
          This option allows other users to see your profile information (Your
          name and lastname, birthday, work expirience etc.)
        </Text>

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

        <View style={styles.lineBreak} />

        <Text style={styles.label}>Keyboard position</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity onPress={() => handlePositionChange("flex-start")}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View style={styles.checkbox}>
                {selectedPosition === "flex-start" && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text>Left</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePositionChange("center")}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View style={styles.checkbox}>
                {selectedPosition === "center" && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text>Center</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePositionChange("flex-end")}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <View style={styles.checkbox}>
                {selectedPosition === "flex-end" && (
                  <View style={styles.checkboxInner} />
                )}
              </View>
              <Text>Right</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangeSettings}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginLeft: 10,
  },
  explanationText: {
    color: "#777",
    fontSize: 14,
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: -5,
    marginBottom: 5,
  },
});

export default AccountSettings;
