import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../views/Profile";
import HomeStackNavigator from "./TestsStackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import TestsStackNavigator from "./TestsStackNavigator";
import Ratings from "../views/Ratings";

// Создаем нижнюю навигацию
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 50, borderTopWidth: 2, borderTopColor: '#29648a', backgroundColor: "#ccc"},
      }}
    >
      <Tab.Screen
        name="Main"
        component={Profile}
        options={{
          tabBarLabel: "Main",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#ccc",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={30} color={focused ? "#a16e83" : "#29648a"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tests"
        component={TestsStackNavigator}
        options={{
          
          tabBarLabel: "Tests",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#ccc",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="poker-chip" size={30} color={focused ? "#a16e83" : "#29648a"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ratings"
        component={Ratings}
        options={{
          tabBarLabel: "Ratings",
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#ccc",
          tabBarInactiveBackgroundColor: "#ccc",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="leaderboard" size={30} color={focused ? "#a16e83" : "#29648a"} />
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
