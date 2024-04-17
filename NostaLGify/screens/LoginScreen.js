import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    //console.log(AuthSession.getRedirectUrl());
    const navigation = useNavigation();

    const navigateToMain = () => {
        navigation.navigate('Main');
    };

    // Define the Spotify authentication endpoint and client ID
    const discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    // Define the authentication request
    const [request, response, promptAsync] = useAuthRequest(
        {
            // clientId: 'e1316c7324f34e9baad599caa68aadd2',
            clientId: 'df72319c2a67411985723932d7d0ac4b', // Kevin's Client:
            scopes: [
                'user-read-email',
                'user-read-private',
                'playlist-modify-public',
                'user-read-currently-playing',
                'user-read-recently-played',
                'playlist-read-private',
                'user-top-read'
            ],
            usePKCE: false,
            redirectUri: makeRedirectUri({ scheme: 'nostalgify', native: "exp://localhost:8081" ,native: "http://localhost:8081"}),
        },
        discovery
    );

    // Handle the authentication response
    useEffect(() => {
        const getToken = async () => {
            if (response?.type === 'success') {
                const { code } = response.params;
                // Exchange the authorization code for an access token
                const tokenEndpoint = 'https://accounts.spotify.com/api/token';
                const redirectUri = makeRedirectUri({ scheme: 'nostalgify', native: "exp://localhost:8081",native: "http://localhost:8081"  });
                //const clientId = 'e1316c7324f34e9baad599caa68aadd2';
                const clientId = 'df72319c2a67411985723932d7d0ac4b'; // Kevin's client
                //const clientSecret = '6a8d779d312a437f947755e810610357'; // Your Spotify app's client secret
                const clientSecret = '9623064c109349db979a2a7f6c2f791a'; // Kevin's client
                const requestBody = {
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    client_id: clientId,
                    client_secret: clientSecret,
                };

                try {
                    const tokenResponse = await fetch(tokenEndpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams(requestBody).toString(),
                    });
                    const tokenData = await tokenResponse.json();

                    console.log('Access token:', tokenData.access_token);
                    console.log('Refresh token:', tokenData.refresh_token);
                    console.log('Expires in:', tokenData.expires_in);

                    await AsyncStorage.setItem('accessToken', tokenData.access_token);

                    navigation.navigate('Main');
                } catch (error) {
                    console.error('Error exchanging code for token:', error);
                }
            }
        };
        getToken();
    }, [response]);

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo
                    style={{ textAlign: 'center' }}
                    name="spotify"
                    size={80}
                    color="white"
                />
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40,
                    }}>
                    Nostalgify
                </Text>

                <View style={{ height: 80 }} />
                <Pressable
                    onPress={() => promptAsync()} // Dummy onPress handler
                    style={{
                        backgroundColor: '#1DB954',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                    <Text>Sign In with Spotify</Text>
                </Pressable>
                <Pressable
                    onPress={navigateToMain} // Dummy onPress handler
                    style={{
                        backgroundColor: '#1DB954',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 300,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text>Guest</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({});
