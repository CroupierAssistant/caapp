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
        tabBarStyle: { height: 50, borderTopWidth: 2, borderTopColor: '#29648a', backgroundColor: "#29648a"},
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
            // <AntDesign name="home" size={24} color={focused ? "#ffbf00" : "#FFF5EE"} />
            focused ? (
              <Image source={require('../assets/icons/home-active.png')} style={{ width: 24, height: 24}}/>
            ) : (
              <Image source={require('../assets/icons/home-inactive.png')} style={{ width: 24, height: 24}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}>MAIN</Text>
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
            // <MaterialCommunityIcons name="poker-chip" size={24} color={focused ? "#ffbf00" : "#FFF5EE"} />
            focused ? (
              <Image source={require('../assets/icons/test-active.png')} style={{ width: 24, height: 24}}/>
            ) : (
              <Image source={require('../assets/icons/test-inactive.png')} style={{ width: 24, height: 24}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}> TESTS</Text>
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
            // <MaterialIcons name="leaderboard" size={24} color={focused ? "#ffbf00" : "#FFF5EE"} />
            focused ? (
              <Image source={require('../assets/icons/ratings-active.png')} style={{ width: 24, height: 24}}/>
            ) : (
              <Image source={require('../assets/icons/ratings-inactive.png')} style={{ width: 24, height: 24}}/>
            )
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text style={{fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE"}}> RATINGS</Text>
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
