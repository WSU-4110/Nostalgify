import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const signOut = async () => {
    console.log('Signing out of Spotify');
    console.log("Before: ",await AsyncStorage.getItem('accessToken'));
    await AsyncStorage.removeItem('accessToken');
    console.log("After: ",await AsyncStorage.getItem('accessToken'));
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign Out of Spotify" onPress={signOut} />
    </View>
  );
};

export default SettingsScreen;
