
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setUserInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {userInfo.display_name}!</Text>
      <Text style={styles.info}>Full Name: {userInfo.display_name}</Text>
      <Text style={styles.info}>Email: {userInfo.email}</Text>
      {/* Add more user information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cca2b7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#583b55',
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
    color: '#583b55',
  },
});

export default HomeScreen;