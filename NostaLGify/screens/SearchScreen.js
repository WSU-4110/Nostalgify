import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import PlaylistItem from "../components/PlaylistItem";



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

async function getPlaylists(token) {
    return await fetchWebApi(
        'v1/me/playlists?offset=0&limit=50', 'GET', null, token
    );
}

const SearchScreen = () => {
    const navigation = useNavigation();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const playlistsData = await getPlaylists(accessToken);
                if (playlistsData?.items) {
                    setPlaylists(playlistsData.items);
                } else {
                    setPlaylists(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching playlists', error);
        }
    };

    return (
        <View style={{ backgroundColor: '#cca2b7', flex: 1, paddingTop: 20 }}>
            <Text style={{ marginLeft: 10, fontSize: 34, fontWeight: "bold", color: "#583b55" }}> Your Library </Text>
            <View style={{ backgroundColor: '#cca2b7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="playlist-music-outline"
                        size={20}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 17, fontWeight: "bold" }}>Playlists</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome6
                        name="record-vinyl"
                        size={18}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 17, fontWeight: "bold" }}>Albums</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="microphone-variant"
                        size={20}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 17, fontWeight: "bold" }}>Artists</Text>
                </View>
            </View>

            <ScrollView>
                <Pressable
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        flex: 1,
                        marginLeft: 15,
                        backgroundColor: "#cca2b7",
                        borderRadius: 4,
                        elevation: 3,
                        marginBottom: 15
                    }}
                >
                    <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                        <Pressable
                            onPress={() => navigation.navigate("Liked")}
                            style={{
                                width: 65,
                                height: 65,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign name="heart" size={24} color="white" />
                        </Pressable>
                    </LinearGradient>

                    <Text style={{ color: "#6a5874", fontSize: 15, fontWeight: "bold" }}>
                        Liked Songs
                    </Text>
                </Pressable>

                <FlatList
                    data={playlists}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlaylistItem item={item} />
                    )}
                />
            </ScrollView>
        </View>
    )
};

export default SearchScreen;
const styles = StyleSheet.create({})