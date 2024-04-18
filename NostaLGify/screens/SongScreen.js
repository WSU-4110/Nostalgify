import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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

async function getTrackInfo(token, trackId) {
    return await fetchWebApi(
        `v1/tracks/${trackId}`, 'GET', null, token
    );
}

const SongScreen = ({ }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { trackId } = route.params;

    const [trackImage, setTrackImage] = useState([]);
    const [trackName, setTrackName] = useState([]);

    useEffect(() => {
        fetchTrackInfo();
    }, []);

    const fetchTrackInfo = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const trackInfoData = await getTrackInfo(accessToken, trackId);
                if (trackInfoData?.name) {
                    setTrackName(trackInfoData.name);
                } else {
                    setTrackImage(null);
                }

                if (trackInfoData?.album) {
                    setTrackImage(trackInfoData.album.images);
                } else {
                    setTrackImage(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching artist items', error);
        }
    };

    return (
        <LinearGradient
            colors={['#cca2b7', '#ab8ca4', '#7f6581', '#6a5874', '#583b55']}
            style={[styles.container, { flex: 1 }]} // Added flex: 1 here
        >
            <View style={{ marginTop: 60, marginLeft: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {trackImage && trackImage.length > 0 && (
                <Image
                    source={{ uri: trackImage[0]?.url }}
                    style={{
                        width: 250,
                        height: 250,
                        marginTop: 20,
                        alignSelf: 'center',
                    }}
                />
            )}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "white" }}>{trackName}</Text>
        </LinearGradient>
    );
};

export default SongScreen;

const styles = StyleSheet.create({})