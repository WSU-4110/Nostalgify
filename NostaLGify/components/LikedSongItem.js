import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const LikedSongItem = ({ item }) => {
    const imageUrl = item.album && item.album.images && item.album.images.length > 0 ? item.album.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.artist}>{item.artists && item.artists.length > 0 ? item.artists[0].name : 'Unknown Artist'}</Text>
        </Pressable>
    );
};

export default LikedSongItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15
    },
    image: {
        width: 65,
        height: 65,
        marginRight: 15,
    },
    text: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    }
});
