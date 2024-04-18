import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlaylistSongItem = ({ item }) => {
    const imageUrl = item.track && item.track.album && item.track.album.images && item.track.album.images.length > 0
        ? item.track.album.images[0].url : null;
        const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate("Song")}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View>
                <Text style={styles.songName}>{item.track.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.artist}>{item.track.artists && item.track.artists.length > 0 ? item.track.artists[0].name
                        : 'Unknown Artist'}</Text>
                    <Text style={styles.album}>, {item.track.album.name}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default PlaylistSongItem;

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
    songName: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    },
    artist: {
        fontSize: 13,
        color: "#6a5874",
    },
    album: {
        fontSize: 13,
        color: "#6a5874"
    }
});
