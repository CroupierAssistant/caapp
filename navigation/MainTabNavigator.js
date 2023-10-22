import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../views/Profile";
import HomeStackNavigator from "./HomeStackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Создаем нижнюю навигацию
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 50, borderTopWidth: 2, borderTopColor: '#29648a'},
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={30} color={focused ? "#ccc" : "#29648a"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="poker-chip" size={30} color={focused ? "#ccc" : "#29648a"} />
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
      <Tab.Screen
        name="Ratings"
        component={Profile}
        options={{
          tabBarLabel: "Ratings",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="leaderboard" size={30} color={focused ? "#ccc" : "#29648a"} />
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
