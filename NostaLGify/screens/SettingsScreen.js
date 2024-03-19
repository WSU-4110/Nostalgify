import React from 'react';
import { View, Text, Button } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const signOut = () => {
    console.log('Signing out of Spotify');
  };

  const changeTheme = () => {
    console.log('Changing theme');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign Out of Spotify" onPress={signOut} />
      <Button title="Change Theme" onPress={changeTheme} />
    </View>
  );
};

export default SettingsScreen;
