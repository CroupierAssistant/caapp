import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import LoggedInUser from "./LoggedInUser";
import RegistrationComponent from "../components/RegistrationComponent";
import AuthorizationComponent from "../components/AuthorizationComponent";

const Profile = (props) => {
  const {
    onAccountSettings,
    onAchievements,
    onWorkoutHistory,
    onNotifications,
    onSupport,
    onSubscriptionStatus,
  } = props;

  const { login, logout, user } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setIsRegistering(false);
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {!user ? (
          <View
            style={{
              width: "100%",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            {isRegistering ? (
              <RegistrationComponent />
            ) : (
              <AuthorizationComponent />
            )}

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text style={styles.toggleButton}>
                {isRegistering
                  ? "Have an account? Log in"
                  : "Don't have an account? Register"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <LoggedInUser
              user={user}
              onSubscriptionStatus={onSubscriptionStatus}
              onAccountSettings={onAccountSettings}
              onAchievements={onAchievements}
              onWorkoutHistory={onWorkoutHistory}
              onNotifications={onNotifications}
              onSupport={onSupport}
              logout={logout}
            />
          </>
        )}
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
    borderTopWidth: 2,
    borderTopColor: "#29648a",
    height: Dimensions.get("window").height - 130,
  },
  toggleButton: {
    color: "#808080",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Profile;
