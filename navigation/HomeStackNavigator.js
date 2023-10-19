import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../views/HomeScreen";
import Blackjack from "../views/games/Blackjack";
import RussianPokerAnte from "../views/games/RussianPokerAnte";
import RussianPokerBonus from "../views/games/RussianPokerBonus";
import RussianPoker5Bonus from "../views/games/RussianPoker5Bonus";
import UTHBlindBets from "../views/games/UTHBlindBets";
import UTHTripsBets from "../views/games/UTHTripsBets";
import TexasHoldEm from "../views/games/TexasHoldEm";
import RouletteSeries from "../views/games/RouletteSeries";
import RoulettePictures from "../views/games/RoulettePictures";
import MultiplicationTable from "../views/games/MultiplicationTable";
import NiuNiuCombinations from "../views/games/NiuNiuCombinations"
import Neighbours from "../views/games/Neighbours"

import CardTest from "../views/games/tests/CardTest";
import RouletteSeriesTest from "../views/games/tests/RouletteSeriesTest";
import MultiplicationTableTest from "../views/games/tests/MultiplicationTableTest";
import RoulettePicturesTest from "../views/games/tests/RoulettePicturesTest";
import RoulettePicturesTestCopy from "../views/games/tests/RoulettePicturesTestCopy";
import NiuNiuCombinationsTest from "../views/games/tests/NiuNiuCombinationsTest";
import NeighboursTest from "../views/games/tests/NeighboursTest";


const Stack = createStackNavigator();

function HomeStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, title: "Main" }}/>
      
      <Stack.Screen name="Blackjack" component={Blackjack}/>
      <Stack.Screen name="RussianPokerAnte" component={RussianPokerAnte} options={{ title: "Russian poker Ante" }}/>
      <Stack.Screen name="RussianPokerBonus" component={RussianPokerBonus} options={{ title: "Russian poker 6-Bonus" }}/>
      <Stack.Screen name="RussianPoker5Bonus" component={RussianPoker5Bonus} options={{ title: "Russian poker 5-Bonus" }}/>
      <Stack.Screen name="UTHBlindBets" component={UTHBlindBets} options={{ title: "UTH Blind Bets" }}/>
      <Stack.Screen name="UTHTripsBets" component={UTHTripsBets} options={{ title: "UTH Trips Bets" }}/>
      <Stack.Screen name="TexasHoldEm" component={TexasHoldEm} options={{ title: "Texas Hold'em bonus" }}/>
      <Stack.Screen name="RouletteSeries" component={RouletteSeries} options={{ title: "Roulette Series" }}/>
      <Stack.Screen name="MultiplicationTable" component={MultiplicationTable} options={{ title: "Multiplication Table" }}/>
      <Stack.Screen name="RoulettePictures" component={RoulettePictures} options={{ title: "Roulette Pictures" }}/>
      <Stack.Screen name="RoulettePicturesTest" component={RoulettePicturesTest} options={{ title: "Roulette Pictures" }}/>
      <Stack.Screen name="RoulettePicturesTestCopy" component={RoulettePicturesTestCopy} options={{ title: "Roulette Pictures Copy" }}/>
      <Stack.Screen name="NiuNiuCombinations" component={NiuNiuCombinations} options={{ title: "Niu-Niu Combinations" }}/>
      <Stack.Screen name="Neighbours" component={Neighbours} options={{ title: "Neighbours" }}/>

      <Stack.Screen name="CardTest" component={CardTest} options={{ title: "" }}/>
      <Stack.Screen name="RouletteSeriesTest" component={RouletteSeriesTest} options={{ title: "" }}/>
      <Stack.Screen name="MultiplicationTableTest" component={MultiplicationTableTest} options={{ title: "" }}/>
      <Stack.Screen name="NiuNiuCombinationsTest" component={NiuNiuCombinationsTest} options={{ title: "" }}/>
      <Stack.Screen name="NeighboursTest" component={NeighboursTest} options={{ title: "" }}/>
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
