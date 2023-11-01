import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
            setAuthenticated(true);
            const userData = JSON.parse(await AsyncStorage.getItem('user'));
            setUser(userData);
          } else {
            setAuthenticated(false);
            setUser(null);
          }
        } else {
          setAuthenticated(false);
          setUser(null);
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
    await AsyncStorage.removeItem('user');
    setUser(null);
    setAuthenticated(false); 
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
