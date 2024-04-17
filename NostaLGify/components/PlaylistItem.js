import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const PlaylistItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{item.name}</Text>
        </Pressable>
    );
};

export default PlaylistItem;

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

