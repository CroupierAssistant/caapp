import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const LoggedInUser = ({
  user,
  onSubscriptionStatus,
  onAccountSettings,
  onAchievements,
  onWorkoutHistory,
  onSupport,
  logout,
}) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: Dimensions.get("window").height - 80,
        }}>
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

        <TouchableOpacity
          onPress={() => navigation.navigate("SubscriptionManagement")}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons
              name="crown-circle"
              size={24}
              color="#ffbf00"
            />
            <Text style={styles.buttonText}>Subscription</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <AntDesign name="profile" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Edit profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountSettings")}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="gear" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Account settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Achievements")}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="ios-medal" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Achievements</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TestHistory")}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <MaterialIcons name="history" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Test history</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HelpSupport")}
          style={{ ...styles.button, borderBottomWidth: 0 }}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="help-circle" size={24} color="#29648a" />
            <Text style={styles.buttonText}>Help & support</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{ ...styles.button, ...styles.logoutButton }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
