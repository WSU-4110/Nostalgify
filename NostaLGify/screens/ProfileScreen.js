
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
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as sf from './spotifyFunctions';
// make sure to download lin grad expo, expo blur

const userTextStyle = {
    fontSize: 25,
    color: '#ffffff', // Modify the color as needed
    // Add more text styles as needed
};

const categoryTextStyle = {
    fontSize: 20,
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
        'v1/me, 'GET', null, token
    );
}
async function getTopTracks(token) {
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&offset=0&limit=10', 'GET', null, token
    )).items;
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
                if (userData?.items) {
                    setUserInfo(userData.display_name);
                    setUserInfo(userData.images.url);
                } else {
                    setUserInfo(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching user data', error);
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
            colors={['rgba(113,77,120,1)', 'rgba(146,99,154,1)', 'rgba(181,139,188,1)']}
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
                        <Text style={[styles.name, userTextStyle]}>
                            {userInfo ? userInfo.display_name : 'Unknown User'}
                        </Text>
                    </View>

                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Recently Played</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.recentlyPlayedContainer}>
                                {recentlyPlayed.map((track, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: track.track.album.images[0].url }}
                                        style={styles.trackImage} // Add your styles here
                                    />
                                ))}
                            </View>
                        </ScrollView>


                    </View>

                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Top Songs</Text>
                        <ScrollView
                            style={styles.scrollView}
                            horizontal={true}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                            </View>
                        </ScrollView>

                    </View>


                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>More Content</Text>
                        <ScrollView
                            style={styles.scrollView}
                            horizontal={true}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                                <Image
                                    source={{ uri: 'https://via.placeholder.com/150' }}
                                    style={styles.recentImage}
                                />
                            </View>
                        </ScrollView>

                    </View>

                    <View style={styles.recentlyPlayedContainer}>
                        <Text style={categoryTextStyle}>Memories</Text>
                        <BlurView
                            intensity={80}
                            tint="dark"
                            style={styles.blurContainer}
                        >
                            <ScrollView
                                style={styles.scrollView}
                                horizontal={true}
                            >
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={{ uri: 'https://via.placeholder.com/150' }}
                                        style={styles.recentImage}
                                    />
                                    <Image
                                        source={{ uri: 'https://via.placeholder.com/150' }}
                                        style={styles.recentImage}
                                    />
                                    <Image
                                        source={{ uri: 'https://via.placeholder.com/150' }}
                                        style={styles.recentImage}
                                    />
                                    <Image
                                        source={{ uri: 'https://via.placeholder.com/150' }}
                                        style={styles.recentImage}
                                    />
                                </View>
                            </ScrollView>
                        </BlurView>
                    </View>

                    <View style={styles.navigationBar}>
                        <TouchableOpacity
                            style={styles.navButton}
                            onPress={() => trackAnalytics('Photos')}
                        >
                            <Text style={styles.navButtonText}>Photos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.navButton}
                            onPress={() => trackAnalytics('Favorite Music')}
                        >
                            <Text style={styles.navButtonText}>Favorite Music</Text>
                        </TouchableOpacity>
                        {/* Add more navigation options as needed */}
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
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
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
