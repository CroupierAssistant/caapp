import React, { useState, useContext, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { login, logout, user } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

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
    const latinRegex = /^[a-zA-Z0-9]+$/;
    const forbiddenCharsRegex = /[!@#$%^&*(),.?":{}|<>]/g;

    if (name !== "email" && !latinRegex.test(value)) {
      setError("Только буквы латинского алфавита и цифры");
      return;
    }

    if (name !== "email" && forbiddenCharsRegex.test(value)) {
      setError("Введены запрещенные символы");
      return;
    }

    // Обновление состояния
    setFormData({ ...formData, [name]: value });
  };

  const isEmailValid = (email) => {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!isEmailValid(formData.email)) {
      setError("Введите корректный email адрес");
      return;
    }
    // Проверка на минимальную длину никнейма и пароля
    if (formData.username.length < 3 || formData.password.length < 8) {
      setError(
        "Никнейм должен содержать минимум 3 символа, а пароль - минимум 8 символов"
      );
      return;
    }

    Axios.post("http://192.168.31.124:3000/register", formData)
      .then((response) => {
        console.log(response.data);
        const { token } = response.data;
        AsyncStorage.setItem("token", token);
        login(response.data.user); // Добавление в контекст после успешной регистрации
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
          if (error.response.status === 409) {
            setError("Имя пользователя уже используется");
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

  const handleLogin = () => {
    Axios.post("http://192.168.31.124:3000/login", {
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
    <ScrollView>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {!user ? (
          <>
            {isRegistering && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Имя</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.firstName}
                    onChangeText={(text) =>
                      handleInputChange("firstName", text)
                    }
                  />
                </View>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Фамилия</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.lastName}
                    onChangeText={(text) => handleInputChange("lastName", text)}
                  />
                </View>
              </>
            )}

            <View style={styles.labelContainer}>
              <Text style={styles.label}>Имя пользователя</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => handleInputChange("username", text)}
              />
            </View>

            {isRegistering && (
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Почта</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  textContentType="emailAddress"
                  onChangeText={(text) => handleInputChange("email", text)}
                />
              </View>
            )}

            <View style={styles.labelContainer}>
              <Text style={styles.label}>Пароль</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry
              />
            </View>

            {isRegistering && (
              <>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Повторите пароль</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChangeText={(text) =>
                      handleInputChange("confirmPassword", text)
                    }
                    secureTextEntry
                  />
                </View>
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
                    Я согласен с обработкой персональных данных
                  </Text>
                </View>
              </>
            )}
            <Button
              title={isRegistering ? "Зарегистрироваться" : "Войти"}
              onPress={isRegistering ? handleRegister : handleLogin}
            />
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
              <Text style={styles.toggleButton}>
                {isRegistering
                  ? "Есть аккаунт - авторизуйтесь"
                  : "Если у вас нет аккаунта - зарегистрируйтесь"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.menu}>
              <Text>Меню пользователя</Text>
              {/* Здесь размещаете кнопки меню */}
            </View>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.logoutButton}>Выйти</Text>
            </TouchableOpacity>
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
    marginVertical: 50,
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
    color: "#007BFF",
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
  logoutButton: {
    color: "#FF0000",
    marginTop: 20,
  },
  errorText: {
    color: "#FF0000",
    marginBottom: 10,
  },
});

export default Profile;
