import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaylistSongItem from "../components/PlaylistSongItem";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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

async function getPlaylistItems(token, playlistId) {
    return await fetchWebApi(
        `v1/playlists/${playlistId}/tracks`, 'GET', null, token
    );
}

async function getPlaylist(token, playlistId) {
    return await fetchWebApi(
        `v1/playlists/${playlistId}`, 'GET', null, token
    );
}

async function getPlaylistImage(token, playlistId) {
    return await fetchWebApi(
        `v1/playlists/${playlistId}/images`, 'GET', null, token
    );
}

const PlaylistScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const playlistUrl = route?.params?.item?.uri;
    const playlistId = playlistUrl.split(":")[2];

    const [playlistItems, setPlaylistItems] = useState([]);
    const [playlistImageUrl, setPlaylistImageUrl] = useState(null);
    const [playlistName, setPlaylistName] = useState('');

    useEffect(() => {
        fetchPlaylistItems();
        fetchPlaylistImage();
        fetchPlaylistName();
    }, []);

    const fetchPlaylistItems = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const playlistItemsData = await getPlaylistItems(accessToken, playlistId);
                if (playlistItemsData?.items) {
                    setPlaylistItems(playlistItemsData.items);
                    setPlaylistName(playlistItemsData.name); // Set the playlist name
                } else {
                    setPlaylistItems(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching playlist items', error);
        }
    };

    const fetchPlaylistName = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const playlistData = await getPlaylist(accessToken, playlistId);
                if (playlistData) {
                    setPlaylistName(playlistData.name);
                } else {
                    console.log("Playlist data not found");
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching playlist name', error);
        }
    };

    const fetchPlaylistImage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const playlistImageData = await getPlaylistImage(accessToken, playlistId);
                if (playlistImageData && playlistImageData.length > 0) {
                    setPlaylistImageUrl(playlistImageData[0].url);
                } else {
                    setPlaylistImageUrl(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching playlist image', error);
        }
    };

    return (
        <LinearGradient
            colors={['#dbbdcc', '#cca2b7', '#ab8ca4', '#7f6581', '#6a5874', '#583b55']}
            style={[styles.container, { flex: 1 }]}
        >
            <View style={{ marginTop: 60, marginLeft: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {playlistImageUrl && <Image source={{ uri: playlistImageUrl }} style={{
                width: 250,
                height: 250,
                marginTop: 20,
                alignSelf: 'center',
            }} />}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "white" }}> {playlistName} </Text>

            <FlatList
                data={playlistItems}
                keyExtractor={(item) => item.track.id}
                renderItem={({ item }) => (
                    <PlaylistSongItem item={item} />
                )}
            />
        </LinearGradient>
    )
}

export default PlaylistScreen
const styles = StyleSheet.create({})