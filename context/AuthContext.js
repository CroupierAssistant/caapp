import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');

        if (authToken) {
          // Отправить токен на сервер для проверки
          const response = await axios.post('https://caapp-server.onrender.com/verifyToken', {
            authToken,
          });

          if (response.data.valid) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
      }
    };

    checkAuthentication();
  }, []);


  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUser(null);
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
