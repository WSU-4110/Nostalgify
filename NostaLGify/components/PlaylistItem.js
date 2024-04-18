import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlaylistItem = ({ item }) => {
    const navigation = useNavigation();
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;
    return (
        <Pressable
            onPress={() =>
                navigation.navigate("Playlist", {
                    item: item,
                })
            }
            style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <Text
                style={styles.playlistName}
                numberOfLines={2} // Set the numberOfLines prop here
                ellipsizeMode="tail" // Set the ellipsizeMode prop here
            >{item.name}</Text>
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
        borderRadius: 2
    },
    playlistName: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    }
});