import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const SavedAlbumItem = ({ item }) => {
    const imageUrl = item.album.images && item.album.images.length > 0 ? item.album.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View>
                <Text style={styles.albumName}>{item.album.name}</Text>
                <Text style={styles.artist}>{item.album.artists && item.album.artists.length > 0 ? item.album.artists[0].name : 'Unknown Artist'}</Text>
            </View>
        </Pressable>
    );
};

export default SavedAlbumItem;

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
    albumName: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    },
    artist: {
        fontSize: 13,
        color: "#6a5874",
    },
});
