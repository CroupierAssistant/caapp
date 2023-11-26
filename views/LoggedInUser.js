import React from "react";
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
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const MenuButton = ({ onPress, icon, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.buttonContent}>
        <Text style={{width: 40, alignItems: 'center', justifyContent: 'center'}}>{icon}</Text>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const LoggedInUser = ({ user, logout }) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await logout(user.username);
    await navigation.navigate("Main");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          width: "100%",
          width: Dimensions.get("screen").width,
          height: Dimensions.get("window").height - 80,
        }}
      >
        {user && (
          <>
            <View style={styles.textContainer}>
              <Text style={styles.nickname}>{user.username}</Text>
              {user.firstName.length || user.lastName.length ? (
                <Text style={styles.username}>
                  {user.firstName} {user.lastName}
                </Text>
              ) : (
                <Text style={styles.usernameUnknown}>"A User Has No Name"</Text>
              )}
            </View>

            {/* <MenuButton
              onPress={() => navigation.navigate("SubscriptionManagement")}
              icon={<MaterialCommunityIcons name="crown-circle-outline" size={26} color="#ffbf00" />}
              text="Subscription"
            /> */}

            <MenuButton
              onPress={() => navigation.navigate("EditProfile")}
              icon={<AntDesign name="profile" size={22} color="#29648a" />}
              text="Edit Profile"
            />

            <MenuButton
              onPress={() => navigation.navigate("AccountSettings")}
              icon={<Ionicons name="settings-outline" size={24} color="#29648a" />}
              text="Account Settings"
            />

            {/* <MenuButton
              onPress={() => navigation.navigate("Achievements")}
              icon={<Ionicons name="medal-outline" size={24} color="#29648a" />}
              text="Achievements"
            /> */}

            {/* <MenuButton
              onPress={() => navigation.navigate("TestHistory")}
              icon={<MaterialIcons name="history" size={24} color="#29648a" />}
              text="Test history"
            /> */}

            <MenuButton
              onPress={() => navigation.navigate("HelpSupport")}
              icon={<Feather name="help-circle" size={24} color="#29648a" />}
              text="Help & Support"
            />

            <TouchableOpacity
              onPress={handleLogout}
              style={{ ...styles.logoutButton }}
            >
              <Text
                style={{ color: "#fff", textAlign: "center", fontSize: 20 }}
              >
                SIGN OUT
              </Text>
            </TouchableOpacity>
          </>
        )}
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
    width: "100%",
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
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "center",
    marginBottom: -1,
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
    alignItems: "center",
    borderRadius: 3,
    width: 200,
    padding: 10,
  },
  timeLimitDescription: {
    marginVertical: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "center",
    width: "100%",
  },
});

export default LoggedInUser;
