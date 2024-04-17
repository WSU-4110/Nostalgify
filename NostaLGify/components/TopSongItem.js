import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const TopSongItem = ({ item }) => {
    const imageUrl = item.album && item.album.images && item.album.images.length > 0 ? item.album.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.artists && item.artists.length > 0 ? item.artists[0].name : 'Unknown Artist'}</Text>
        </Pressable>
    );
};


export default TopSongItem;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'left', // Align items horizontally
        marginBottom: 15,
        marginTop: 20,
    },
    image: {
        width: 130,
        height: 130,
        marginRight: 10,
        borderRadius: 2,
    },
    text: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        maxWidth: 140, 
        marginTop: 5
    },
});

