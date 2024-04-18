import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlbumSongItem from "../components/AlbumSongItem";
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
        <LinearGradient
            colors={colorPalette}
            style={{ flex: 1 }} // Added flex: 1 here
        >
            <View style={{ marginTop: 60, marginLeft: 20 }}>
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
                        marginTop: 20,
                        alignSelf: 'center',
                    }}
                />
            )}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "white" }}> {albumName} </Text>

            <FlatList
                data={albumItems.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AlbumSongItem item={item} />
                )}
            />
        </LinearGradient>
    )
}

export default AlbumSongScreen
const styles = StyleSheet.create({})