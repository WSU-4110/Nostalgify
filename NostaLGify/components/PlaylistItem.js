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