import React, {useState, useEffect} from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../views/Profile";
import HomeStackNavigator from "./TestsStackNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import TestsStackNavigator from "./TestsStackNavigator";
import Ratings from "../views/Ratings";
import ProfileStackNavigator from "./ProfileStackNavigator";
import Social from "../views/Social";
import DuelScreen from "../views/DuelScreen";
import { useNavigation } from "@react-navigation/native";

// Создаем нижнюю навигацию
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const navigation = useNavigation();
  const [tabKey, setTabKey] = useState(0); // Создаем состояние для ключа

  useEffect(() => {
    // Вызов функции обновления ключа при изменении выбранного таба
    // Это можно реализовать через обработчики событий навигатора табов
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      setTabKey((prevKey) => prevKey + 1);
    });

    return unsubscribe;
  }, [navigation]); // Следим за изменениями объекта навигации

  return (
    <Tab.Navigator
      key={tabKey} // Присваиваем ключ навигатору табов
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 10,
          borderTopColor: "#29648a",
          backgroundColor: "#29648a",
        },
        unmountOnBlur: true
      }}
    >
      <Tab.Screen
        name="Main"
        component={ProfileStackNavigator}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Image
                source={require("../assets/icons/account-inactive.png")}
                style={{ width: 26, height: 26 }}
              />
            ) : (
              <Image
                source={require("../assets/icons/account-active.png")}
                style={{ width: 26, height: 26 }}
              />
            ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE" }}
            >
              PROFILE
            </Text>
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
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Image
                source={require("../assets/icons/test-active.png")}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                source={require("../assets/icons/test-inactive.png")}
                style={{ width: 24, height: 24 }}
              />
            ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE" }}
            >
              TESTS
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Duels"
        component={DuelScreen}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="sword-cross"
              size={24}
              color={focused ? "#ffbf00" : "#FFF5EE"}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE" }}
            >
              DUELS
            </Text>
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
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Image
                source={require("../assets/icons/ratings-active.png")}
                style={{ width: 24, height: 24 }}
              />
            ) : (
              <Image
                source={require("../assets/icons/ratings-inactive.png")}
                style={{ width: 24, height: 24 }}
              />
            ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE" }}
            >
              RATINGS
            </Text>
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
      <Tab.Screen
        name="Social"
        component={Social}
        options={{
          tabBarShowLabel: true,
          tabBarActiveBackgroundColor: "#29648a",
          tabBarInactiveBackgroundColor: "#29648a",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="user-friends"
              size={24}
              color={focused ? "#ffbf00" : "#FFF5EE"}
            />
          ),
          tabBarLabel: ({ focused, color, size }) => (
            <Text
              style={{ fontSize: 10, color: focused ? "#ffbf00" : "#FFF5EE" }}
            >
              SOCIAL
            </Text>
          ),
          headerShown: false,
          detachPreviousScreen: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
