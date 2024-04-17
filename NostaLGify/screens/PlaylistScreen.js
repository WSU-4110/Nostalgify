import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaylistSongItem from "../components/PlaylistSongItem";


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
        <View style={{ backgroundColor: '#cca2b7', flex: 1 }}>
            {playlistImageUrl && <Image source={{ uri: playlistImageUrl }} style={{
            width: 250,
            height: 250,
            marginTop: 60,
            alignSelf: 'center',
        }} />}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "#583b55" }}> {playlistName} </Text>

            <FlatList
                data={playlistItems}
                keyExtractor={(item) => item.track.id}
                renderItem={({ item }) => (
                    <PlaylistSongItem item={item} />
                )}
            />
        </View>
    )
}

export default PlaylistScreen
const styles = StyleSheet.create({})