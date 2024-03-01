import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
<<<<<<< HEAD
=======
import * as AppAuth from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

>>>>>>> 102af7d69d75e03c039adc6224916d45b6c1855a

const LoginScreen = () => {
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