// AccountSettings.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AccountSettings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('https://caapp-server.onrender.com/change-password', {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        updateUser({ ...user, password: newPassword });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        Alert.alert('Success', 'Password changed successfully');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while changing password');
    }
  };

  return (
    <View>
      <Text>Смена пароля</Text>
      <TextInput
        secureTextEntry
        placeholder="Текущий пароль"
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        secureTextEntry
        placeholder="Новый пароль"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        secureTextEntry
        placeholder="Подтвердите новый пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Изменить пароль" onPress={handleChangePassword} />
    </View>
  );
};

export default AccountSettings;
