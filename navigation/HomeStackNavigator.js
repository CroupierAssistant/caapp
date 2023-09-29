import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../views/HomeScreen";
import Blackjack from "../views/games/Blackjack";
import RussianPokerAnte from "../views/games/RussianPokerAnte";
import RussianPokerBonus from "../views/games/RussianPokerBonus";
import UTHBlindBets from "../views/games/UTHBlindBets";
import UTHTripsBets from "../views/games/UTHTripsBets";
import TexasHoldEm from "../views/games/TexasHoldEm";
import RouletteSeries from "../views/games/RouletteSeries";

import CardTest from "../views/games/tests/CardTest";
import RouletteSeriesTest from "../views/games/tests/RouletteSeriesTest";


const Stack = createStackNavigator();

function HomeStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, title: "Main" }}/>
      
      <Stack.Screen name="Blackjack" component={Blackjack}/>
      <Stack.Screen name="RussianPokerAnte" component={RussianPokerAnte} options={{ title: "Russian poker Ante" }}/>
      <Stack.Screen name="RussianPokerBonus" component={RussianPokerBonus} options={{ title: "Russian poker Bonus" }}/>
      <Stack.Screen name="UTHBlindBets" component={UTHBlindBets} options={{ title: "UTH Blind Bets" }}/>
      <Stack.Screen name="UTHTripsBets" component={UTHTripsBets} options={{ title: "UTH Trips Bets" }}/>
      <Stack.Screen name="TexasHoldEm" component={TexasHoldEm} options={{ title: "Texas Hold'em bonus" }}/>
      <Stack.Screen name="RouletteSeries" component={RouletteSeries} options={{ title: "Roulette Series" }}/>

      <Stack.Screen name="CardTest" component={CardTest}/>
      <Stack.Screen name="RouletteSeriesTest" component={RouletteSeriesTest}/>
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
