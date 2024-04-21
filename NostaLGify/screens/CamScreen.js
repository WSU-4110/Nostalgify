import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Add this import statement

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
    'v1/me/player/recently-played?limit=1', 'GET', null, token
  );
}

const CamScreen = () => {
  const navigation = useNavigation(); // Use the useNavigation hook
  const [trackId, setTrackId] = useState(null); // Current Track Playing ID

  useEffect(() => {
    fetchCurrentTrack();
  }, []);
  
  const fetchCurrentTrack = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const currentTrackData = await getCurrentTrack(accessToken);
        if (currentTrackData.items && currentTrackData.items.length > 0) {
          const track = currentTrackData.items[0].track;
          setTrackId(track.id); // Set the track ID
          console.log("Track ID:", track.id);
        } else {
          setTrackId(null); // Set trackId to null if no track is playing
          console.log("No track currently playing");
        }
      } else {
        console.error('Access token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching current track:', error);
    }
  };

  const handleAddCollection = async () => {
    try {
      console.log('Attempting to add collection...');
      
      if (!trackId) {
        console.error('Track ID is null or undefined.');
        return;
      }
  
      const firestore = getFirestore();
      const newCollectionRef = collection(firestore, 'collections', trackId);
      const initialData = { exampleField: 'exampleValue' };
      await setDoc(doc(newCollectionRef, 'initialData'), initialData);
  
      console.log('Collection added successfully:', trackId);
      Alert.alert('Success', `Collection ${trackId} added successfully!`);
  
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding collection:', error);
      Alert.alert('Error', 'Failed to add collection. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddCollection}>
        <Text style={styles.buttonText}>Add Collection</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CamScreen;
