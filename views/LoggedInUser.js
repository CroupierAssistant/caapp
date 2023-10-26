import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import axios from "axios";

const LoggedInUser = ({
  user,
  onSubscriptionStatus,
  onAccountSettings,
  onAchievements,
  onWorkoutHistory,
  onNotifications,
  onSupport,
  logout,
}) => {
  const [photo, setPhoto] = useState(null);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
  if (pickerResult.cancelled === true) {
    return;
  }
  
  setPhoto(pickerResult.uri);
  uploadImage(pickerResult);
  };

  const uploadImage = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: imageData.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      const response = await axios.post('https://caapp-server.onrender.com/upload', formData);
      console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };


  return (
    <View>
      <View style={styles.profileContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nickname}>{user.username}</Text>
          {user.firstName && user.lastName && (
            <Text style={styles.username}>
              {user.firstName} {user.lastName}
            </Text>
          )}
          {!user.firstName ||
            (!user.lastName && (
              <Text style={styles.usernameUnknown}>"A User Has No Name"</Text>
            ))}
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {photo && (
            <Image source={photo} style={{ width: 200, height: 200 }} />
          )}
          <Button title="Choose Image" onPress={openImagePickerAsync} />
        </View>
        {/* <TouchableOpacity onPress={onSubscriptionStatus} style={styles.button}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons
              name="crown-circle"
              size={24}
              color="#ffbf00"
            />
            <Text style={styles.buttonText}>Subscription</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onAccountSettings} style={styles.button}>
          <View style={styles.buttonContent}>
            <FontAwesome name="gear" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Account settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAchievements} style={styles.button}>
          <View style={styles.buttonContent}>
            <Ionicons name="ios-medal" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Achievements</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onWorkoutHistory} style={styles.button}>
          <View style={styles.buttonContent}>
            <MaterialIcons name="history" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Test history</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={onNotifications} style={styles.button}>
          <View style={styles.buttonContent}>
            <Ionicons name="notifications" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Notification settings</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={onSupport}
          style={{ ...styles.button, borderBottomWidth: 0 }}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="help-circle" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Help and support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{ ...styles.button, ...styles.logoutButton }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    // marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#29648a",
    width: Dimensions.get("screen").width,
  },
  nickname: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#29648a",
  },
  username: {
    fontSize: 16,
    marginBottom: 20,
    color: "#29648a",
  },
  usernameUnknown: {
    fontSize: 16,
    marginBottom: 20,
    color: "#29648a",
    fontStyle: "italic",
  },
  button: {
    width: Dimensions.get("screen").width,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: "#29648a",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#29648a",
    position: "absolute",
    left: 25,
  },
  logoutButton: {
    backgroundColor: "#a16e83",
    marginVertical: 20,
    borderWidth: 0,
    width: Dimensions.get("screen").width * 0.6,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 3,
  },
});

export default LoggedInUser;
