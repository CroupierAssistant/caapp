import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = (props) => {
  const {
    onAccountSettings,
    onAchievements,
    onWorkoutHistory,
    onNotifications,
    onSupport,
    onSubscriptionStatus,
  } = props;

  const uploadProfilePhoto = async (photoUri) => {
    const formData = new FormData();
    formData.append('profilePhoto', {
      uri: photoUri,
      type: 'image/jpeg',
      name: 'profile.jpg'
    });
  
    try {
      await Axios.post('https://caapp-server.onrender.com/upload-profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${AsyncStorage.getItem("token")}` // Предполагается, что вы используете JWT и у вас есть токен
        }
      });
      console.log('Фотография профиля успешно загружена');
    } catch (error) {
      console.error('Ошибка при загрузке фотографии профиля:', error);
    }
  };

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
    if (pickerResult.cancelled === true) {
      return;
    }
  
    const photoUri = pickerResult.uri;
    await uploadProfilePhoto(photoUri);
  }

  const { login, logout, user } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    setUserPhoto(
      user && user.profilePhoto ? user.profilePhoto : ''
    );
  }, [user]);

  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
    setIsRegistering(false);
  }, []);

  const handleInputChange = (name, value) => {
    // Проверка на латиницу и запрещенные символы
    // const latinRegex = /^[a-zA-Z0-9]+$/;
    // const forbiddenCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g;

    // if (isRegistering && name != "email" && !latinRegex.test(value)) {
    //   setError("Только буквы латинского алфавита и цифры");
    //   return;
    // }

    // if (isRegistering && name != "email" && forbiddenCharsRegex.test(value)) {
    //   setError("Введены запрещенные символы");
    //   return;
    // }

    // Обновление состояния
    setFormData({ ...formData, [name]: value || "" }); // Добавлена проверка на undefined/null
  };

  // const isEmailValid = (email) => {
  //   // Регулярное выражение для проверки email
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const errors = {};

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Пароли не совпадают";
    }

    // if (!isEmailValid(formData.email)) {
    //   errors.email = "Введите корректный email адрес";
    // }

    // if (formData.username.length < 3) {
    //   errors.username = "Никнейм должен содержать минимум 3 символа";
    // }

    // if (formData.password.length < 8) {
    //   errors.password = "Пароль должен содержать минимум 8 символов";
    // }

    // if (Object.keys(errors).length > 0) {
    //   setErrors(errors);
    //   return;
    // }

    // Проверка на минимальную длину никнейма и пароля
    // if (formData.username.length < 3 || formData.password.length < 8) {
    //   setError(
    //     "Никнейм должен содержать минимум 3 символа, а пароль - минимум 8 символов"
    //   );
    //   return;
    // }

    // Axios.post("http://192.168.31.124:3000/register", formData)
    Axios.post("https://caapp-server.onrender.com/register", formData)
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        AsyncStorage.setItem("token", token);
        login(response.data.user); // Добавление в контекст после успешной регистрации
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
        setError(null);
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          if (error.response.status === 409) {
            setError("Имя пользователя уже используется");
          } else {
            setError("");
            setError("Ошибка запроса. Проверьте введенные данные.");
          }
        } else if (error.request) {
          setError("Нет ответа от сервера");
        } else {
          setError("Произошла ошибка");
        }
      });
  };

  const handleLogin = () => {
    // Axios.post("http://192.168.31.124:3000/login", {
    Axios.post("https://caapp-server.onrender.com/login", {
      username: formData.username,
      password: formData.password,
    })
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        AsyncStorage.setItem("token", token);
        login(response.data.user); // Добавление в контекст после успешной авторизации
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agree: false,
        });
        setError(null);
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          if (error.response.status === 401) {
            setError("Пользователь не найден или пароль введен неверно");
          } else {
            setError("Ошибка запроса. Проверьте введенные данные.");
          }
        } else if (error.request) {
          setError("Нет ответа от сервера");
        } else {
          setError("Произошла ошибка");
        }
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {!user ? (
          <>
            {isRegistering ? (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange("username", text)}
                  />
                </View>
                {errors.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>E-mail</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.email}
                    textContentType="emailAddress"
                    onChangeText={(text) => handleInputChange("email", text)}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry
                  />
                </View>
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Repeat password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(text) =>
                      handleInputChange("confirmPassword", text)
                    }
                    secureTextEntry
                  />
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

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
                    I agree with the processing of personal data
                  </Text>
                </View>

                {error && <Text style={styles.error}>{error}</Text>}
              </>
            ) : (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.username}
                    onChangeText={(text) => handleInputChange("username", text)}
                  />
                </View>
                {errors.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry
                  />
                </View>
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </>
            )}

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button
              title={isRegistering ? "Register" : "Login"}
              onPress={isRegistering ? handleRegister : handleLogin}
            />
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text style={styles.toggleButton}>
                {isRegistering
                  ? "Have an account? Log in"
                  : "Don't have an account? Register"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleImagePick}>
                <View style={styles.profilePhoto}>
                  {user.profilePhoto ? (
                    <Image
                      source={{ uri: userPhoto }}
                      style={{ width: 150, height: 150 }}
                    />
                  ) : (
                    <FontAwesome name="user" size={80} color="#29648a" />
                  )}
                </View>
                <View style={styles.editIconContainer}>
                  <FontAwesome
                    name="pencil-square-o"
                    size={24}
                    color="#29648a"
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.nickname}>{user.username}</Text>
                <Text style={styles.username}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
              <TouchableOpacity
                onPress={onSubscriptionStatus}
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
                onPress={onAccountSettings}
                style={styles.button}
              >
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
              <TouchableOpacity
                onPress={onWorkoutHistory}
                style={styles.button}
              >
                <View style={styles.buttonContent}>
                  <MaterialIcons name="history" size={24} color="#29648a" />
                  <Text style={styles.buttonText}>Test history</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onNotifications} style={styles.button}>
                <View style={styles.buttonContent}>
                  <Ionicons name="notifications" size={24} color="#29648a" />
                  <Text style={styles.buttonText}>Notification settings</Text>
                </View>
              </TouchableOpacity>
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
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 16,
    paddingVertical: 20,
    // marginVertical: 50,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 3,
    paddingLeft: 10,
    borderRadius: 3,
  },
  toggleButton: {
    color: "#29648a",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 15,
    height: 15,
    backgroundColor: "#000",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },

  labelContainer: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 2,
    color: "#333",
    fontWeight: "bold",
  },
  menu: {
    alignItems: "center",
  },
  errorText: {
    color: "#FF0000",
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#29648a",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  nickname: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
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
  editIconContainer: {
    position: "absolute",
    right: 5,
    bottom: 15,
    width: 20,
    height: 20,
  },
});

export default Profile;
