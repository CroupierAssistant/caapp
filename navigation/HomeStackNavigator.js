import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../views/HomeScreen';
import Blackjack from '../views/games/Blackjack';
import Poker from '../views/games/Poker';
import Roulette from '../views/games/Roulette';

const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Blackjack" component={Blackjack} />
      <Stack.Screen name="Poker" component={Poker} />
      <Stack.Screen name="Roulette" component={Roulette} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
