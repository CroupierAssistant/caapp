// Switcher.js

import React from 'react';
import { View, Text, Switch } from 'react-native';

const Switcher = ({ isEnabled, toggleSwitch, isAuthenticated }) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 26 }}>Switch mode</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#0d8215" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={!isAuthenticated}
        />
      </View>
    </View>
  );
}

export default Switcher;
