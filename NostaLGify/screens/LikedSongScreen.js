import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import LikedSongItem from "../components/LikedSongItem";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

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

async function getLikedSongs(token) {
    return await fetchWebApi(
        'v1/me/tracks?offset=0&limit=50', 'GET', null, token
    );
}

const LikedSongScreen = () => {
    const navigation = useNavigation();
    const [likedSongs, setLikedSongs] = useState([]);

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
        fetchLikedSongs();
    }, []);

    const fetchLikedSongs = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const likedSongsData = await getLikedSongs(accessToken);
                if (likedSongsData?.items) {
                    setLikedSongs(likedSongsData.items);
                } else {
                    setLikedSongs(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching liked songs', error);
        }
    };

    return (
        <LinearGradient
            colors={colorPalette}
            style={[styles.container, { flex: 1 }]} // Added flex: 1 here
        >
            <View style={{marginTop: 60, marginLeft: 20}}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    borderRadius: 4,
                    elevation: 0,
                    marginTop: 20

                }}
            >
                <LinearGradient colors={colorPalette}>
                    <View
                        onPress={() => navigation.navigate("Liked")}
                        style={{
                            width: 250,
                            height: 250,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AntDesign name="heart" size={92} color="white" />
                    </View>
                </LinearGradient>
            </View>

            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "white" }}> Liked Songs </Text>

            <FlatList
                data={likedSongs}
                keyExtractor={(item) => item.track.id}
                renderItem={({ item }) => (
                    <LikedSongItem item={item} />
                )}
            />

        </LinearGradient>
    )
}

export default LikedSongScreen
const styles = StyleSheet.create({})