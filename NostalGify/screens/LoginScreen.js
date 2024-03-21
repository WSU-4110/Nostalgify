import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React ,{useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
//import createNativeStackNavigator from './StackNavigator';
import { useNavigation } from '@react-navigation/native';
import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage"


const LoginScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);

            if (accessToken && expirationDate) {
                const currentTime = Date.now();
                if (currentTime < parseInt(expirationDate)) { // Token is still valid
                    navigation.replace("Main");
                } else { // Token expired, remove from async storage
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }

        checkTokenValidity
    },[])
    // Authentication
    async function authenticate () {
        const config = {
            issuer:"https://accounts.spotify.com",
            clientId: "06335027a9a548db97dae585531719dd",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-read-currently-playing",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
                "playlist-modify-private",
                "playlist-read-public",
                "playlist-read-private",
                "app-remote-control",
                "streaming"
            ],
            redirectUrl:"exp://localhost:19000/--/spotify-auth-callback"
        }
        const result = await AppAuth.authAsync(config);
        console.log(result);
        if (result.accessToken) {
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage.setItem("token",result.accessToken);
            AsyncStorage.setItem("expirationDate",expirationDate.toString());
            navigation.navigate("Main")
        } 
    }


    //const handleSignInPress = () => {

        //put anything related to authentication here


        // navigation.navigate("Main");
    //};
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
                    onPress={authenticate}
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