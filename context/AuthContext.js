import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DeviceInfo from 'react-native-device-info'; // Подключаем библиотеку для работы с устройством

const AuthContext = createContext();

const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');

        if (authToken) {
          const response = await axios.post('https://caapp-server.onrender.com/verifyToken', {
            authToken,
          });

          if (response.data.valid) {
            const userData = JSON.parse(await AsyncStorage.getItem('user'));

            // Считываем ID устройства
            const deviceId = DeviceInfo.getUniqueId();

            // Проверяем, совпадает ли ID устройства
            if (userData.deviceId === deviceId) {
              setAuthenticated(true);
              setUser(userData);
            } else {
              await logout(); // Несовпадение, выполняем выход
            }
          } else {
            await logout(); // Невалидный токен, выполняем выход
          }
        } else {
          await logout(); // Отсутствует токен, выполняем выход
        }
      } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
      }
    };
  
    checkAuthentication();
  }, []);

  const login = async (userData) => {
    // Считываем ID устройства
    const deviceId = DeviceInfo.getUniqueId();

    // Добавляем ID устройства к объекту пользователя перед сохранением
    const updatedUserData = { ...userData, deviceId };
    setUser(updatedUserData);

    // Сохраняем пользователя
    AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    setUser(null);
    setAuthenticated(false); 
  };

  const updateUser = async (newUserData) => {
    // Считываем ID устройства
    const deviceId = DeviceInfo.getUniqueId();

    // Добавляем ID устройства к объекту пользователя перед обновлением
    const updatedUserData = { ...newUserData, deviceId };
    setUser(updatedUserData);

    // Обновляем пользователя
    AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
