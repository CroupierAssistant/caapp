// Switcher.js

import React from 'react';
import { View, Text, Switch } from 'react-native';

const Switcher = ({ isEnabled, toggleSwitch, user }) => {
  return (
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
      <Text style={{ fontSize: 26 }}>Switch mode</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Switch
          trackColor={{ false: "#ccc", true: "#ccc" }}
          thumbColor={isEnabled ? "#29648a" : "#29648a"}
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
          disabled={!user}
        />
      </View>
    </View>
  );
}

export default Switcher;
