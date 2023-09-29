// Switcher.js

import React from 'react';
import { View, Text, Switch } from 'react-native';

const Switcher = ({ isEnabled, toggleSwitch, isAuthenticated }) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 26 }}>Switch mode</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Switch
          trackColor={{ false: "#fff", true: "#fff" }}
          thumbColor={isEnabled ? "#29648a" : "#29648a"}
          ios_backgroundColor="#fff"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={!isAuthenticated}
        />
      </View>
    </View>
  );
}

export default Switcher;
