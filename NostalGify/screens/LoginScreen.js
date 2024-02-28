import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const LoginScreen = () => {
    const navigation = useNavigation();
    useEffect(() =>{                                         
        const checkTokenValidity = async () => {
            // verify using token and expiration date. log if expired (?)
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);

            if(accessToken && expirationDate){
                // checking if token and expdate are good based on current time
                const currentTime = Date.now();
                if(currentTime < parseInt(expirationDate)){
                    // token is still valid in this case
                    navigation.replace("HomeScreen");
                } else{
                    // token is expired, so remove from async storage
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");

                }
            }
        }
        checkTokenValidity();
    }, [])
    async function authenticate (){
        const config = {
            issuer:"https://accounts.spotify.com", 
            clientId:"df72319c2a67411985723932d7d0ac4b",
            scopes:[
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectUrl:"exp://localhost:8081/--/spotify-auth-callback"
        }
        const result = await AppAuth.authAsync(config);
        console.log(result);
        if(result.accessToken) {
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token",result.accessToken);
            AsyncStorage.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("HomeScreen")
        }
    }
    return (
        <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={{ height: 80 }} />
                <Entypo
                    style={{ textAlign: "center" }}
                    name="spotify"
                    size={80}
                    color="white"
                />
                <Text
                    style={{
                        color: "white",
                        fontSize: 40,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 40
                    }}
                >
                    Nostalgify
                </Text>

                <View style={{ height: 80 }} />
                <Pressable
                    style={{
                        backgroundColor: "#1DB954",
                        padding: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: 300,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    >
                    <Text>Sign In with Spotify</Text>
                </Pressable>
            </SafeAreaView>
        </LinearGradient>

    )
}

export default LoginScreen

const styles = StyleSheet.create({})