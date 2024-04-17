import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const RecentSongItem = ({ item }) => {
    const imageUrl = item.track && item.track.album && item.track.album.images.length > 0 ? item.track.album.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{item.track.name}</Text>
            <Text style={styles.text}>{item.track.album.artists && item.track.album.artists.length > 0 ? item.track.album.artists[0].name : 'Unknown Artist'}</Text>
        </Pressable>
    );
};

export default RecentSongItem;

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

