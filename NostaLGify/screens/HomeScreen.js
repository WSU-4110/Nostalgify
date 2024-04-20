import { StyleSheet, Text, View, ActivityIndicator, TextInput, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CamScreen2 from '../screens/CamScreen2'; // Import CamScreen2
import { LinearGradient } from 'expo-linear-gradient';

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
  return await fetchWebApi('v1/me/player/currently-playing', 'GET', null, token);
}

async function getRecentlyPlayed(token) {
  return await fetchWebApi(
    'v1/me/player/recently-played?&limit=10', 'GET', null, token
  );
}


async function skipToPreviousTrack(token) {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
  fetch("https://api.spotify.com/v1/me/player/previous", {
    headers: {
      Authorization: "Bearer " + token
    },
    method: "POST"
  })
}

async function skipToNextTrack(token) {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
  fetch("https://api.spotify.com/v1/me/player/next", {
    headers: {
      Authorization: "Bearer " + token
    },
    method: "POST"
  })
}

async function pauseTrack(token) {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
  fetch("https://api.spotify.com/v1/me/player/pause", {
    headers: {
      Authorization: "Bearer " + token
    },
    method: "PUT"
  })
}

async function resumeTrack(token) {
  // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
  fetch("https://api.spotify.com/v1/me/player/play", {
    headers: {
      Authorization: "Bearer " + token
    },
    method: "PUT"
  })
}



const HomeScreen = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tagInputVisible, setTagInputVisible] = useState(false); // State to manage input visibility
  const [tagText, setTagText] = useState(''); // State to store tag text
  const navigation = useNavigation();


  const [colorPalette, setColorPalette] = useState(['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7']);

  useEffect(() => {
    const getColorPalette = async () => {
      const savedColorPalette = await AsyncStorage.getItem('colorPalette');
      if (savedColorPalette) {
        setColorPalette(JSON.parse(savedColorPalette));
      }
    };

    getColorPalette();
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch the updated color palette when the SettingsScreen is focused
      getColorPalette();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fetchRecentlyPlayed();
    fetchCurrentTrack();



  }, []);

  const fetchRecentlyPlayed = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        const recentTrackData = await getRecentlyPlayed(accessToken);
        if (recentTrackData?.items) {
          setRecentlyPlayed(recentTrackData.items);
          AsyncStorage.setItem('recentTrackData', JSON.stringify(recentTrackData.items));
        } else {
          setRecentlyPlayed(null);
        }
      } else {
        console.error('Access token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching recently played', error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };




  const fetchCurrentTrack = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        // Resume the track
        await resumeTrack(accessToken);

        // Wait for a short duration before pausing
        await new Promise(resolve => setTimeout(resolve, 600));

        // Pause the track
        await pauseTrack(accessToken);

        // Fetch the current trackc

        const currentTrackData = await getCurrentTrack(accessToken);
        setCurrentTrack(null)
        if (currentTrackData && currentTrackData.item) {
          setCurrentTrack(currentTrackData.item);
        } else {
          setCurrentTrack(null);
        }

      } else {
        console.error('Access token not found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error fetching current track:', error);
    }
  };


  const handleSkipToPrevious = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        await skipToPreviousTrack(accessToken);

        // After skipping to next track, fetch the updated current track
        await fetchCurrentTrack();
      } else {
        console.error('Access token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const handleSkipToNext = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        await skipToNextTrack(accessToken);

        // After skipping to next track, fetch the updated current track
        await fetchCurrentTrack();

      } else {
        console.error('Access token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error skipping to next track:', error);
    }
  };

  const handleTagIconPress = () => {
    // Toggle the visibility of the input area
    setTagInputVisible(!tagInputVisible);
  };

  const handleTagInputChange = (text) => {
    // Update the tag text as the user types
    setTagText(text);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }


  return (
    <LinearGradient
      colors={colorPalette}
      style={styles.container}
    >
      {/* Current track information */}
      {
        currentTrack && (
          <View>
            <Image
              style={styles.albumCover}
              source={{ uri: currentTrack.album.images[0].url }}
            />
            <Text style={styles.trackName}>{currentTrack.name}</Text>
            <Text style={styles.artistName}>
              {currentTrack.artists.map((artist) => artist.name).join(', ')}
            </Text>
          </View>
        )
      }

      {/* No track message */}
      {
        !currentTrack && (
          recentlyPlayed && recentlyPlayed.length > 0 ? (
            <View>
              <Image
                style={styles.albumCover}
                source={{ uri: recentlyPlayed[0].track.album.images[0].url }}
              />
              <Text style={styles.trackName}>{recentlyPlayed[0].track.name}</Text>
              <Text style={styles.artistName}>{recentlyPlayed[0].track.artists[0].name}</Text>
            </View>
          ) : (
            <Text style={styles.noTrack}>No recently played track</Text>
          )

        )
      }

      {/* Buttons container */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSkipToPrevious}>
          <Ionicons name="play-skip-back" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={() =>
          navigation.navigate('Camera')
        }>
          <FontAwesome6 name='camera' size={24} color='white' />
        </TouchableOpacity>
        
        {/* Tag icon wrapped in Pressable */}
        <View style={styles.tagContainer}>
          {/* Tag icon wrapped in Pressable */}
          <Pressable style={styles.iconContainer} onPress={handleTagIconPress}>
            <FontAwesome6 name='tag' size={24} color='white' />
          </Pressable>
          {/* Input area */}
          {tagInputVisible && (
            <TextInput
              style={styles.tagInput}
              placeholder="Enter tag"
              onChangeText={handleTagInputChange}
              value={tagText}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSkipToNext}>
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </TouchableOpacity>



      </View>
    </LinearGradient >
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
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 5,

  },

  trackName: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    maxWidth: 250,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  noTrack: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '30%',
    gap: 220,
    marginBottom: 20
  },

  iconContainer: {
    flexDirection: 'row',
    marginTop: 35,
  },
  tagContainer: {
    
    alignItems: 'center',
  },
  tagInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15, // Increased padding
    paddingVertical: 10, // Increased padding
    borderRadius: 5,
    marginTop: 10,
    fontSize: 16, // Increased font size
  },
});

export default HomeScreen;