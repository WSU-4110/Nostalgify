import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArtistSongItem from "../components/ArtistSongItem";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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

async function getArtistItems(token, artistId) {
    return await fetchWebApi(
        `v1/artists/${artistId}/top-tracks`, 'GET', null, token
    );
}

async function getArtistImageAndName(token, artistId) {
    return await fetchWebApi(
        `v1/artists/${artistId}`, 'GET', null, token
    );
}

const ArtistScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const artistUrl = route?.params?.item?.uri;
    const artistId = artistUrl.split(":")[2];

    const [artistItems, setArtistItems] = useState([]);
    const [artistImage, setArtistImage] = useState([]);
    const [artistName, setArtistName] = useState([]);

    useEffect(() => {
        fetchArtistItems();
        fetchArtistImageAndName();
    }, []);

    const fetchArtistItems = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const artistItemsData = await getArtistItems(accessToken, artistId);
                if (artistItemsData?.tracks) {
                    setArtistItems(artistItemsData.tracks);
                } else {
                    setArtistItems(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching artist items', error);
        }
    };

    const fetchArtistImageAndName = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const artistImageAndNameData = await getArtistImageAndName(accessToken, artistId);
                if (artistImageAndNameData?.images) {
                    setArtistImage(artistImageAndNameData.images);
                } else {
                    setArtistImage(null);
                }

                if (artistImageAndNameData?.name) {
                    setArtistName(artistImageAndNameData.name);
                } else {
                    setArtistName(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching artist image and name', error);
        }
    };

    return (
        <LinearGradient
            colors={['#cca2b7', '#ab8ca4', '#7f6581', '#6a5874', '#583b55']}
            style={[styles.container, { flex: 1 }]} // Added flex: 1 here
        >
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {artistImage && artistImage.length > 0 && (
                <Image
                    source={{ uri: artistImage[0]?.url }}
                    style={{
                        width: 250,
                        height: 250,
                        marginTop: 60,
                        alignSelf: 'center',
                    }}
                />
            )}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "white" }}> {artistName}'s Top Tracks</Text>

            <FlatList
                data={artistItems}
                keyExtractor={(item) => item.id.toString()} // Make sure to convert id to string
                renderItem={({ item, index }) => (
                    <ArtistSongItem item={item} index={index} />
                )}
            />
        </LinearGradient>
    )
}

export default ArtistScreen
const styles = StyleSheet.create({})