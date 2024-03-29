
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
    ActivityIndicator  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


const ProfileScreen = () => { 
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    
    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await fetch('https://api.spotify.com/v1/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const data = await response.json();
            setUserInfo(data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching user info:', error);
            setIsLoading(false);
          }
        };
        fetchUserInfo();
      }, []);
    
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
                <Image
                    source={{uri: userInfo.images[0].url}}
                    style={styles.profileImage}
                />
                
                <Text style={[styles.name, userTextStyle]}>{userInfo.display_name}</Text>
                
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
