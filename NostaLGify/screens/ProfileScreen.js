
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Pressable,
    FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecentSongItem from '../components/RecentSongItem';
import TopSongItem from  '../components/TopSongItem';
import PlaylistItem from "../components/PlaylistItem";

//import * as sf from './spotifyFunctions';
// make sure to download lin grad expo, expo blur

const categoryTextStyle = {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff', // Modify the color as needed
    // Add more text styles as needed
};
async function fetchWebApi(endpoint, method, body, token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let url = `https://api.spotify.com/${endpoint}`;
    if (method === 'GET' && body) {
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
    }
    const res = await fetch(url, {
        headers,
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    return await res.json();
}

async function getUserInfo(token) {
    return await fetchWebApi(
        'v1/me', 'GET', null, token
    );  
}

async function getTopTracks(token) {
    return await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=10', 'GET', null, token
    );
}

async function getRecentlyPlayed(token) {
    return await fetchWebApi(
        'v1/me/player/recently-played?after=1484811043508&limit=10', 'GET', null, token
    );
}

async function getPlaylists(token) {
    return await fetchWebApi(
        'v1/me/playlists?offset=0&limit=50', 'GET', null, token
    );
}
const ProfileScreen = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUserInfo();
        fetchTopTracks();
        fetchRecentlyPlayed();
        fetchPlaylists();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const userData = await getUserInfo(accessToken);
                if (userData) {
                    setUserInfo(userData);
                } else {
                    setUserInfo(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching user data', error);
        } finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
        }
    };
    
    
    const fetchTopTracks = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const topTrackData = await getTopTracks(accessToken);
                if (topTrackData?.items) {
                    setTopTracks(topTrackData.items);
                } else {
                    setTopTracks(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching top tracks', error);
        }   finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
        }
    };    
    
    const fetchRecentlyPlayed = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const recentTrackData = await getRecentlyPlayed(accessToken);
                if (recentTrackData?.items) {
                    setRecentlyPlayed(recentTrackData.items);
                } else {
                    setRecentlyPlayed(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching recently played', error);
        }    finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
        }
    };    
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
        }   finally {
            setIsLoading(false); // Set loading to false regardless of success or failure
        }
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
    colors={['#583b55', '#6a5874', '#7f6581', '#ab8ca4', '#cca2b7']}
    style={styles.container}
>

            <SafeAreaView style={styles.container}>
                <ScrollView alwaysBounceVertical={false} alwaysBounceHorizontal={false}>

                    <View style={styles.userInfoContainer}>
                        {userInfo && userInfo.images && userInfo.images.length > 0 && (
                            <Image
                                source={{ uri: userInfo.images[0].url }}
                                style={styles.profileImage}
                            />
                        )}
                        <Text style={[styles.name]}>
                            {userInfo ? userInfo.display_name : 'Unknown User'}
                        </Text>
                    </View>


                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Recently Played</Text>
                        <FlatList
                            data={recentlyPlayed}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <RecentSongItem item={item} />
                            )}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                        />

                    </View>

                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Top Tracks</Text>
                        <FlatList
                            data={topTracks}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <TopSongItem item={item} />
                            )}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                        />

                    </View>
                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Recent Playlists</Text>
                        <FlatList
                            data={playlists}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <PlaylistItem item={item} />
                            )}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}

                        />

                    </View>



                </ScrollView>
            </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    userInfoContainer: {
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20,
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    bio: {
        fontSize: 18,
        marginBottom: 20,
    },
    blurContainer: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'left',
        overflow: 'hidden',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        flexDirection: 'row',
    },
    recentImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },

    recentlyPlayedContainer: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    
    scrollView: {
        marginTop: 10,
        marginBottom: 10,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'bottom',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 20,
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
});


export default ProfileScreen;
