import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../views/HomeScreen";
import BlackjackTest from "../views/games/tests/BlackjackTest";
import PokerTest from "../views/games/tests/PokerTest";
import Blackjack from "../views/games/Blackjack";
import RussianPokerAnte from "../views/games/RussianPokerAnte";
import RussianPokerBonus from "../views/games/RussianPokerBonus";
import UTHBlindBets from "../views/games/UTHBlindBets";
import UTHTripsBets from "../views/games/UTHTripsBets";
import TexasHoldEm from "../views/games/TexasHoldEm";
// import Roulette from "../views/games/Roulette";

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
      <Stack.Screen name="RussianPokerAnte" component={RussianPokerAnte} />
      <Stack.Screen name="RussianPokerBonus" component={RussianPokerBonus} />
      <Stack.Screen name="UTHBlindBets" component={UTHBlindBets} />
      <Stack.Screen name="UTHTripsBets" component={UTHTripsBets} />
      <Stack.Screen name="PokerTest" component={PokerTest} />
      <Stack.Screen name="TexasHoldEm" component={TexasHoldEm} />
      {/* <Stack.Screen name="Roulette" component={Roulette} /> */}
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
