import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getNowPlayingItem = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found in AsyncStorage');
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current track: ' + response.status);
    }

    const data = await response.json();
    console.log('Current Track:', data);

    if (!data || Object.keys(data).length === 0) {
      throw new Error('No currently playing track found');
    }

    return data;
  } catch (error) {
    console.error('Error fetching current track:', error.message);
    throw error;
  }
};

const HomeScreen = () => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    fetchCurrentTrack();
  }, []);

  const fetchCurrentTrack = async () => {
    try {
      const currentTrackData = await getNowPlayingItem();
      setCurrentTrack(currentTrackData);
    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  return (
    <View style={styles.container}>
      {currentTrack ? (
        <View style={styles.trackInfo}>
          <Image
            style={styles.albumCover}
            source={{ uri: currentTrack.item.album.images[0].url }}
          />
          <Text style={styles.trackName}>{currentTrack.item.name}</Text>
          <Text style={styles.artist}>{currentTrack.item.artists[0].name}</Text>
        </View>
      ) : (
        <Text style={styles.noTrack}>No track currently playing</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cca2b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackInfo: {
    alignItems: 'center',
  },
  albumCover: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  trackName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  artist: {
    fontSize: 16,
    color: 'white',
  },
  noTrack: {
    fontSize: 18,
    color: 'white',
  },
});

export default HomeScreen;
