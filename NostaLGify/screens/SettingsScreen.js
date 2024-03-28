import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
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

  const changeTheme = () => {
    console.log('Changing theme');
    // Implement theme changing logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out of Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cca2b7',
  },
  button: {
    backgroundColor: '#6a5874',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonMargin: {
    marginTop: 10,
  },
  buttonText: {
    color: '#cca2b7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
