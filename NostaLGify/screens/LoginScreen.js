import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Linking , Image} from 'react-native';
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
            clientId: 'e1316c7324f34e9baad599caa68aadd2',
            //clientId: '06335027a9a548db97dae585531719dd', // Kevin's Client:
            scopes: [
                'user-read-email',
                'user-read-private',
                'playlist-modify-public',
                'user-read-currently-playing',
                'user-read-recently-played',
                'playlist-read-private',
                'user-library-read',
                'user-modify-playback-state',
                'user-top-read',
                'user-follow-read'
            ],
            usePKCE: false,
            redirectUri: makeRedirectUri({ scheme: 'nostalgify', native: "exp://localhost:8081", native: "http://localhost:8081"}),
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
                const clientId = 'e1316c7324f34e9baad599caa68aadd2';
                //const clientId = '06335027a9a548db97dae585531719dd'; // Kevin's client
                const clientSecret = '6a8d779d312a437f947755e810610357'; // Your Spotify app's client secret
                //const clientSecret = '2e8ac880929b45a1a39930265e28b5ae'; // Kevin's client
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
        <LinearGradient colors={colorPalette} style={{ flex: 1 }}>
            <SafeAreaView>
                <View 
                style={{
                flex: 1,
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                height: 80,
                marginTop: 200,
                marginBottom: 70

                }}>
                <Image 
                    source={require('../assets/blt.png')}
                    style={{
                        width: 150,
                        height: 150, 
                        resizeMode: 'contain',
                    }}/>
                    </View>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 40,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 10,
                    }}>
                    Nostalgify
                </Text>

                <View 
                style={{ 
                    height: 80,
                    flexDirection: 'column',
                    gap: 15,
                    marginTop: 50 }} >
                <Pressable
                    onPress={() => promptAsync()} // Dummy onPress handler
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 275,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Sign In with Spotify</Text>
                </Pressable>
                <Pressable
                    onPress={navigateToMain} // Dummy onPress handler
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: 275,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Guest</Text>
                </Pressable>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({});
