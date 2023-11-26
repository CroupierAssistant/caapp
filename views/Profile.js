import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import LoggedInUser from "./LoggedInUser";
import RegistrationComponent from "../components/RegistrationComponent";
import AuthorizationComponent from "../components/AuthorizationComponent";
import Loader from "../components/Loader";

const Profile = () => {
  const { logout, user, authenticated } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsRegistering(false);
    setTimeout(() => {
      setIsFirstLoad(false);
    }, 300); // Время паузы в миллисекундах (в данном примере, 3000 мс = 3 секунды)
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#fff" }}
    >
      {isFirstLoad ? (
        <View style={styles.container}>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <>
            {!authenticated && !user ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {isRegistering ? (
                  <RegistrationComponent
                    isRegistering={isRegistering}
                    setIsRegistering={setIsRegistering}
                  />
                ) : (
                  <AuthorizationComponent
                    isRegistering={isRegistering}
                    setIsRegistering={setIsRegistering}
                  />
                )}
              </View>
            ) : (
              <LoggedInUser user={user} logout={logout} />
            )}
          </>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    height: Dimensions.get("window").height - 80,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Цвет фона
  },
});

export default Profile;
