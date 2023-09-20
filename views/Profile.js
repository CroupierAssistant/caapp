import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <View>
          <TouchableOpacity style={styles.menuItem}>
            <Text>User information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Statistics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.authButton} onPress={login}>
            <Text>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButton} onPress={login}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#d52d2d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  authButton: {
    backgroundColor: '#4783b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Profile;
