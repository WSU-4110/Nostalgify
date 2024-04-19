import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlbumItem = ({ item }) => {
    const imageUrl = item.album.images && item.album.images.length > 0 ? item.album.images[0].url : null;
    const navigation = useNavigation();

    return (

        <Pressable style={styles.container} onPress={() =>
            navigation.navigate("AlbumSong", {
                item: item,
            })
        }>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View>
                <Text
                    style={styles.albumName}
                    numberOfLines={2} // Set the numberOfLines prop here
                    ellipsizeMode="tail" // Set the ellipsizeMode prop here
                >
                    {item.album.name}
                </Text>


                <Text style={styles.artist}>{item.album.artists && item.album.artists.length > 0 ? item.album.artists[0].name : 'Unknown Artist'}</Text>
            </View>
        </Pressable>
    );
};

export default AlbumItem;

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
    albumName: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold",
        maxWidth: 270
    },
    artist: {
        fontSize: 13,
        color: "white",
    },
});
