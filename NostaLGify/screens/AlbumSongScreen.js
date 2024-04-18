import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlbumSongItem from "../components/AlbumSongItem";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


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

async function getAlbumItems(token, albumId) {
    return await fetchWebApi(
        `v1/albums/${albumId}`, 'GET', null, token
    );
}

const AlbumSongScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const albumUrl = route?.params?.item?.album?.uri;
    const albumId = albumUrl.split(":")[2];

    const [albumItems, setAlbumItems] = useState([]);
    const [albumImage, setAlbumImage] = useState([]);
    const [albumName, setAlbumName] = useState([]);

    useEffect(() => {
        fetchAlbumItems();
    }, []);

    const fetchAlbumItems = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (accessToken) {
                const albumItemsData = await getAlbumItems(accessToken, albumId);
                if (albumItemsData?.tracks) {
                    setAlbumItems(albumItemsData.tracks);
                } else {
                    setAlbumItems(null);
                }

                if (albumItemsData?.images) {
                    setAlbumImage(albumItemsData.images);
                } else {
                    setAlbumImage(null);
                }

                if (albumItemsData?.name) {
                    setAlbumName(albumItemsData.name);
                } else {
                    setAlbumName(null);
                }
            } else {
                console.error('Access token not found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error fetching album items', error);
        }
    };

    return (
        <View style={{ backgroundColor: '#cca2b7', flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {albumImage && albumImage.length > 0 && (
                <Image
                    source={{ uri: albumImage[0]?.url }}
                    style={{
                        width: 250,
                        height: 250,
                        marginTop: 60,
                        alignSelf: 'center',
                    }}
                />
            )}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 20, fontWeight: "bold", color: "#583b55" }}> {albumName} </Text>

            <FlatList
                data={albumItems.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AlbumSongItem item={item} />
                )}
            />
        </View>
    )
}

export default AlbumSongScreen
const styles = StyleSheet.create({})