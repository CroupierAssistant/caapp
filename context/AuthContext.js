import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Ваши действия по авторизации (например, отправка запроса на сервер)
    // После успешной авторизации, установите объект пользователя
    setUser(userData);
    console.log(user)
  };

  const logout = () => {
    // Ваши действия по выходу
    // Удалите объект пользователя
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
