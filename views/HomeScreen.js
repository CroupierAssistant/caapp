import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeStackNavigator from '../navigation/HomeStackNavigator';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    // <Tab.Navigator>
    //   <Tab.Screen name="Главная" component={HomeStackNavigator} />
    // </Tab.Navigator>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Главная страница</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        padding: 20
    },
    button: {
        backgroundColor: 'grey',
        padding: 15,
        marginBottom: 10,
        borderRadius: 3,
        width: '100%'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    headerText: {
        fontSize: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 20,
        width: '100%'
    }
});

export default HomeScreen;
