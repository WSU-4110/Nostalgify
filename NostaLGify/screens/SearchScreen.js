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
import ArtistItem from "../components/ArtistItem";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { debounce } from "lodash";

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
        <LinearGradient
            colors={colorPalette}
            style={[styles.container, { flex: 1 }]}
        >
            <ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Liked")}
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        flex: 1,
                        marginLeft: 15,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        borderRadius: 2,
                        elevation: 0,
                        marginBottom: 15
                    }}
                >
                    <LinearGradient colors={colorPalette}>
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

                    <Text style={{ color: "white", fontSize: 15, fontWeight: "bold", marginLeft: 5 }}>
                        Liked Songs
                    </Text>
                </TouchableOpacity>

                {playlists.map((item, index) => (
                    <PlaylistItem key={index} item={item} />
                ))}
            </ScrollView>
        </LinearGradient>
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
        <LinearGradient
            colors={colorPalette}
            style={{paddingTop: 20, flex: 1}}
        >
            <FlatList
                data={albums}
                keyExtractor={(item) => item.album.id}
                renderItem={({ item }) => (
                    <AlbumItem item={item} />
                )}
            />
        </LinearGradient>
    );
};

const ListArtistsScreen = () => {
    const navigation = useNavigation();
    async function getArtists(token) {
        return await fetchWebApi(
            'v1/me/following?type=artist&offset=0&limit=50', 'GET', null, token
        );
    }

    const [artist, setArtists] = useState([]);
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
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const artistsData = await getArtists(accessToken);
                if (artistsData?.artists) {
                    setArtists(artistsData.artists);
                    console.log(artist);
                } else {
                    setArtists(null);
                    console.log("b");
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching artists', error);
        }
    };

    return (
        <LinearGradient
            colors={colorPalette}
            style={{paddingTop: 20, flex: 1}}
        >
            <FlatList
                data={artist.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ArtistItem item={item} />
                )}
            />
        </LinearGradient>
    );
};

const SearchScreen = () => {
    const navigation = useNavigation();
    const [colorPalette, setColorPalette] = useState(['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7']);
    const [input, setInput] = useState("");

    const debouncedSearch = debounce(handleSearch, 500);
    
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

    function handleSearch(text) {
        // Search here
    }

    const handleInputChange = (text) => {
        setInput(text);
        debouncedSearch(text);
    }

    return (
        <LinearGradient
            colors={colorPalette} style={{flex: 1, paddingTop: 80 }}>


            <Text style={{ marginLeft: 10, fontSize: 34, fontWeight: "bold", color: "white", marginTop: 15, marginBottom: 15 }}> Your Library </Text>

            <Tab.Navigator
                screenOptions={{
                    indicatorStyle: { backgroundColor: 'rgba(0,0,0,0)' },
                    tabBarStyle: { backgroundColor: 'rgba(0,0,0,0)', elevation: 0 },
                }}
            >

                <Tab.Screen
                    name="Playlists"
                    component={ListPlaylistsScreen}
                    options={{
                        tabBarLabel: ({}) => (
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                Playlists
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Albums"
                    component={ListAlbumsScreen}
                    options={{
                        tabBarLabel: ({}) => (
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                Albums
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Artists"
                    component={ListArtistsScreen}
                    options={{
                        tabBarLabel: ({}) => (
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>
                                Artists
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>


        </LinearGradient>
    );

};

export default SearchScreen;
const styles = StyleSheet.create({})