import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  // const [user, setUser] = useState({
  //   username: 'G0rdonShumway',
  //   firstName: 'Pavlo',
  //   lastName: 'Zorin',
  //   profilePhoto: 'https://static.wikia.nocookie.net/doblaje/images/e/e1/Alf-0.jpg/revision/latest?cb=20200912124507&path-prefix=es',
  // });

  const login = (userData) => {
    // Ваши действия по авторизации (например, отправка запроса на сервер)
    // После успешной авторизации, установите объект пользователя
    setUser(userData);
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
