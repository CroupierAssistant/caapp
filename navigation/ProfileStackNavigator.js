import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../views/Profile";
import EditProfile from "../views/EditProfile";
import AccountSettings from "../views/AccountSettings";
import Achievements from "../views/Achievements";
import TestHistory from "../views/TestHistory";
import HelpSupport from "../views/HelpSupport";
import SubscriptionManagement from "../views/SubscriptionManagement";

const Stack = createStackNavigator();

function ProfileStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, title: "Profile" }}/>
      
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }}/>
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ title: "Account Settings" }}/>
      <Stack.Screen name="Achievements" component={Achievements} options={{ title: "Achievements" }}/>
      <Stack.Screen name="TestHistory" component={TestHistory} options={{ title: "Test History" }}/>
      <Stack.Screen name="HelpSupport" component={HelpSupport} options={{ title: "Help & Support" }}/>
      <Stack.Screen name="SubscriptionManagement" component={SubscriptionManagement} options={{ title: "Subscription" }}/>
      
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
