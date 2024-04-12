import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

class AuthService {
    static discovery = {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    };

    static getClientId() {
        return 'e1316c7324f34e9baad599caa68aadd2';
    }

    static getScopes() {
        return ['user-read-email', 'playlist-modify-public', 'user-read-currently-playing','user-read-recently-played'];
    }

    static getRedirectUri() {
        return makeRedirectUri({ scheme: 'nostalgify', native: "exp://localhost:8081" ,native: "http://localhost:8081"});
    }
}

class TokenService {
    static async exchangeCodeForToken(code) {
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';
        const redirectUri = AuthService.getRedirectUri();
        const clientId = AuthService.getClientId();
        const clientSecret = '6a8d779d312a437f947755e810610357';
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

            return tokenData;
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            throw error;
        }
    }
}

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = useNavigation();
    }

    navigateToMain = () => {
        this.navigation.navigate('Main');
    };

    async handleResponse(response) {
        if (response?.type === 'success') {
            const { code } = response.params;
            try {
                const tokenData = await TokenService.exchangeCodeForToken(code);
                console.log('Access token:', tokenData.access_token);
                console.log('Refresh token:', tokenData.refresh_token);
                console.log('Expires in:', tokenData.expires_in);

                await AsyncStorage.setItem('accessToken', tokenData.access_token);

                this.navigateToMain();
            } catch (error) {
                console.error('Error exchanging code for token:', error);
            }
        }
    }

    render() {
        const [request, response, promptAsync] = useAuthRequest(
            {
                clientId: AuthService.getClientId(),
                scopes: AuthService.getScopes(),
                usePKCE: false,
                redirectUri: AuthService.getRedirectUri(),
            },
            AuthService.discovery
        );

        useEffect(() => {
            this.handleResponse(response);
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
                        onPress={this.navigateToMain} // Dummy onPress handler
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
    }
}

export default LoginScreen;

const styles = StyleSheet.create({});