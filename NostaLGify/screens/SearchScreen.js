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
import AlbumItem from "../components/AlbumItem";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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

const Tab = createMaterialTopTabNavigator();

const ListPlaylistsScreen = () => {
    const navigation = useNavigation();

    async function getPlaylists(token) {
        return await fetchWebApi(
            'v1/me/playlists?offset=0&limit=50', 'GET', null, token
        );
    }

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
        <View style={{ backgroundColor: '#cca2b7', flex: 1 }}>
            <ScrollView>
                <Pressable
                    onPress={() => navigation.navigate("Liked")}
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
                        <View
                            style={{
                                width: 65,
                                height: 65,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign name="heart" size={24} color="white" />
                        </View>
                    </LinearGradient>

                    <Text style={{ color: "#6a5874", fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>
                        Liked Songs
                    </Text>
                </Pressable>

                {playlists.map((item, index) => (
                    <PlaylistItem key={index} item={item} />
                ))}
            </ScrollView>
        </View>
    )
};

const ListAlbumsScreen = () => {
    const navigation = useNavigation();
    async function getAlbums(token) {
        return await fetchWebApi(
            'v1/me/albums?offset=0&limit=50', 'GET', null, token
        );
    }

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const albumsData = await getAlbums(accessToken);
                if (albumsData?.items) {
                    setAlbums(albumsData.items);
                } else {
                    setAlbums(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching albums', error);
        }
    };

    return (
        <View style={{ backgroundColor: '#cca2b7', flex: 1, paddingTop: 20 }}>
            <FlatList
                data={albums}
                keyExtractor={(item) => item.album.id}
                renderItem={({ item }) => (
                    <AlbumItem item={item} />
                )}
            />
        </View>
    );
};

const ListArtistsScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            {/* Artists code here */}
        </ScrollView>
    );
};



const SearchScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#dbbdcc', flex: 1, paddingTop: 80 }}>
            <Text style={{ marginLeft: 10, fontSize: 34, fontWeight: "bold", color: "#583b55", marginBottom: 10 }}> Your Library </Text>
            
            <Tab.Navigator
                screenOptions={{
                    labelStyle: { fontSize: 17, fontWeight: 'bold', color: '#6a5874' },
                    indicatorStyle: { backgroundColor: '#6a5874' },
                    tabBarStyle: { backgroundColor: '#D6B4C5' },
                }}
            >
                <Tab.Screen name="Playlists" component={ListPlaylistsScreen} />
                <Tab.Screen name="Albums" component={ListAlbumsScreen} />
                <Tab.Screen name="Artists" component={ListArtistsScreen} />
            </Tab.Navigator>
        </View>
    );
    
};

export default SearchScreen;
const styles = StyleSheet.create({})