import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../views/HomeScreen";
import Blackjack from "../views/games/Blackjack";
import Poker from "../views/games/Poker";
import Roulette from "../views/games/Roulette";
import BlackjackTest from "../views/games/tests/BlackjackTest";

const Stack = createStackNavigator();

function HomeStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Blackjack" component={Blackjack} />
      <Stack.Screen name="BlackjackTest" component={BlackjackTest} />
      <Stack.Screen name="Poker" component={Poker} />
      <Stack.Screen name="Roulette" component={Roulette} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
