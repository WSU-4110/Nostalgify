import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [colorPalette, setColorPalette] = useState(['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7']);

  const signOut = async () => {
    console.log('Signing out of Spotify');
    console.log("Before: ",await AsyncStorage.getItem('accessToken'));
    await AsyncStorage.removeItem('accessToken');
    console.log("After: ",await AsyncStorage.getItem('accessToken'));
    navigation.navigate('Login');
  };

  useEffect(() => {
    const getColorPalette = async () => {
      const savedColorPalette = await AsyncStorage.getItem('colorPalette');
      if (savedColorPalette) {
        setColorPalette(JSON.parse(savedColorPalette));
      }
    };

    getColorPalette();
  }, []);

  const changeTheme = (palette) => {
    console.log('Changing theme');
    // Implement theme changing logic here
    setColorPalette(palette);
    AsyncStorage.setItem('colorPalette', JSON.stringify(palette));
  };
  

  return (
    <LinearGradient
      colors={colorPalette}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.groupHeaderText}>Change Color Palette</Text>
          <TouchableOpacity style={styles.button} onPress={() => changeTheme(['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7'])}>
            <Text style={styles.buttonText}>Nostalgia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeTheme(['#5f805f', '#89b789', '#b3d0b3', '#a1bba1', '#c8d8c8'])}>
            <Text style={styles.buttonText}>Spring Grass</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeTheme(['#91eff6', '#adeee9', '#c8eddc', '#e4ebcf', '#ffeac2'])}>
            <Text style={styles.buttonText}>Summer Beach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeTheme(['#c1756e', '#d99d87', '#f0c6a8', '#fce0c7', '#fff5d9'])}>
            <Text style={styles.buttonText}>Autumn Leaves</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeTheme(['#94f2f4', '#a0e6ec', '#d0eceb', '#ecfffd', '#ffffff'])}>
            <Text style={styles.buttonText}>Winter Snow</Text>
          </TouchableOpacity>
          <Text style={styles.groupHeaderText}>Sign Out of Spotify</Text>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
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
    //justifyContent: 'center',
    paddingTop: 40,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  groupHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },  
});

export default SettingsScreen;
