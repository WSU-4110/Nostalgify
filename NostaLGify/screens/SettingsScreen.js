import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      colors={['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7']}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={{ marginTop: 60, marginLeft: 20 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out of Spotify</Text>
        </TouchableOpacity>
      </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  backButton: {
    paddingRight: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(237, 229, 238, .7)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
