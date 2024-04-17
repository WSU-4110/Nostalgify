import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const pftPlaylistItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text style={styles.text}>{item.name}</Text>
        </Pressable>
    );
};

export default pftPlaylistItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center', // Align items horizontally
        marginBottom: 15,
        marginLeft: 15,
        marginTop: 20,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 15,
        borderRadius: 2,
    },
    text: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        maxWidth: 150, 
        marginTop: 5
    },
});
