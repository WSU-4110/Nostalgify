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
        <View style={{ backgroundColor: '#cca2b7', flex: 1 }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    marginTop: 60

                }}
            >
                <LinearGradient colors={["#33006F", "#FFFFFF"]}>
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

                <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "#583b55" }}> Liked Songs </Text>

            <FlatList
                data={likedSongs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LikedSongItem item={item} />
                )}
            />
        </View>
    )
}

export default LikedSongScreen
const styles = StyleSheet.create({})