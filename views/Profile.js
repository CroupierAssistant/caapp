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
              <RegistrationComponent isRegistering={isRegistering} setIsRegistering={setIsRegistering}/>
            ) : (
              <AuthorizationComponent isRegistering={isRegistering} setIsRegistering={setIsRegistering}/>
            )}
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
    height: Dimensions.get("window").height - 80,
  },
});

export default Profile;
