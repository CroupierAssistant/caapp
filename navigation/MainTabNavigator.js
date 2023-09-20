import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../views/HomeScreen";
import Profile from "../views/Profile";
import HomeStackNavigator from './HomeStackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Создаем нижнюю навигацию
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#4783b8',
          tabBarInactiveBackgroundColor: '#eee',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="home" color={focused ? '#eee' : '#4783b8'}  size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: '#4783b8',
          tabBarInactiveBackgroundColor: '#eee',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="account" color={focused ? '#eee' : '#4783b8'}  size={30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
