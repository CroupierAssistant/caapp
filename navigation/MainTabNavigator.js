import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../views/Profile";
import HomeStackNavigator from "./TestsStackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import TestsStackNavigator from "./TestsStackNavigator";
import Ratings from "../views/Ratings";
import ProfileStackNavigator from "./ProfileStackNavigator";

// Создаем нижнюю навигацию
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { borderTopWidth: 10, borderTopColor: '#29648a', backgroundColor: "#29648a"},
      }}
    >
      <Tab.Screen
        name="Main"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) => (
            focused ? (
              <Image source={require('../assets/icons/account-inactive.png')} style={{ width: 26, height: 26}}/>
            ) : (
              <Image source={require('../assets/icons/account-active.png')} style={{ width: 26, height: 26}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}>PROFILE</Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tests"
        component={TestsStackNavigator}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) => (
            focused ? (
              <Image source={require('../assets/icons/test-active.png')} style={{ width: 24, height: 24}}/>
            ) : (
              <Image source={require('../assets/icons/test-inactive.png')} style={{ width: 24, height: 24}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}>TESTS</Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ratings"
        component={Ratings}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) => (
            focused ? (
              <Image source={require('../assets/icons/ratings-active.png')} style={{ width: 24, height: 24}}/>
            ) : (
              <Image source={require('../assets/icons/ratings-inactive.png')} style={{ width: 24, height: 24}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}>RATINGS</Text>
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
