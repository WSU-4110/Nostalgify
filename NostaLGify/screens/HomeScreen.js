import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccessTokenSingleton from './AccessTokenSingleton';

const accessTokenInstance = AccessTokenSingleton.getInstance();
accessTokenInstance.setAccessToken('your_access_token_here');

const accessToken = accessTokenInstance.getAccessToken();

async function fetchWebApi(endpoint, method, body, token) {
    const headers = {
        Authorization: `Bearer ${token}`,
      };
      let url = `https://api.spotify.com/${endpoint}`;
      if (method === 'GET' && body) {
        // If it's a GET request and there's a body, encode it into the URL
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
      }
      const res = await fetch(url, {
        headers,
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined, // Only include body for non-GET requests
      });
      return await res.json();
  }
  
  async function getCurrentTrack(token) {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
    return await fetchWebApi(
      'v1/me/player/currently-playing', 'GET', null, token
    );
  }
  
  const HomeScreen = () => {
    const [currentTrack, setCurrentTrack] = useState(null);
  
    useEffect(() => {
      fetchCurrentTrack();
    }, []);
  
    const fetchCurrentTrack = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const currentTrackData = await getCurrentTrack(accessToken);
          if (currentTrackData?.item) {
            setCurrentTrack(currentTrackData.item);
          } else {
            setCurrentTrack(null); // Set currentTrack to null if no track is playing
          }
        } else {
          console.error('Access token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching current track:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        {currentTrack && (
          <View>
            <Image
              style={styles.albumCover}
              source={{ uri: currentTrack.album.images[0].url }}
            />
            <Text style={styles.trackName}>{currentTrack.name}</Text>
            <Text style={styles.artistName}>{currentTrack.artists.map(artist => artist.name).join(', ')}</Text>
          </View>
        )}
        {!currentTrack && (
          <Text style={styles.noTrack}>No track currently playing</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cca2b7',
      paddingTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    artistName: {
      fontSize: 16,
    },
    noTrack: {
      fontSize: 18,
      color: 'white',
    },
  });
  
  export default HomeScreen;
