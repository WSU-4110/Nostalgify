
import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// make sure to download lin grad expo, expo blur

const userTextStyle = {
    fontSize: 25,
    color: '#ffffff', // Modify the color as needed
    fontFamily: 'Gothic', // Modify the font family as needed
    // Add more text styles as needed
};

const categoryTextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Modify the color as needed
    fontFamily: 'Gothic', // Modify the font family as needed
    // Add more text styles as needed
};

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
async function getUserInfo(token) {
    const profilePictureEndpoint = 'https://api.spotify.com/v1/me';
    const userNameEndpoint = 'https://api.spotify.com/v1/me'; // Replace this with the endpoint to fetch user name
    
    try {
        const profilePictureResponse = await fetchWebApi(profilePictureEndpoint, 'GET', null, token);
        const userNameResponse = await fetchWebApi(userNameEndpoint, 'GET', null, token);

        // Check for errors in profile picture response
        if (profilePictureResponse.error) {
            throw new Error(`Error fetching profile picture: ${profilePictureResponse.error.message}`);
        }
        
        // Check for errors in user name response
        if (userNameResponse.error) {
            throw new Error(`Error fetching user name: ${userNameResponse.error.message}`);
        }

        const profilePicture = profilePictureResponse; // Assuming profile picture response is a valid URI
        const userName = userNameResponse.display_name; // Assuming user name is stored in the "display_name" field
        
        return { profilePicture, userName };
    } catch (error) {
        throw new Error(`Error fetching user info: ${error.message}`);
    }
}

const ProfileScreen = () => { 
    const [profilePicture, setProfilePicture] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const { profilePicture, userName } = await getUserInfo(accessToken);
                setProfilePicture(profilePicture);
                setUserName(userName);
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    
    return (
        
        <LinearGradient
            colors={['rgba(113,77,120,1)', 'rgba(146,99,154,1)', 'rgba(181,139,188,1)']}
            style={styles.container}
        >        
        <SafeAreaView style={styles.container}> 
            <ScrollView alwaysBounceVertical={false} alwaysBounceHorizontal={false}>
            <View style={styles.userInfoContainer}>
                        <Image
                            source={{ uri: userInfo?.images?.[0]?.url || 'https://via.placeholder.com/150' }}
                            style={styles.profileImage}
                        />

                
                <Text style={[styles.name, userTextStyle]}>{userName.display_name}</Text>
                
            </View>

            <View style={styles.recentlyPlayedContainer}>
                <Text style ={categoryTextStyle}>Recently Played</Text>
                <ScrollView 
                    style={styles.scrollView}
                    horizontal={true}
                >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
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
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
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
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
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
