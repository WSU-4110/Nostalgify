import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlbumSongItem = ({ item }) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() =>
            navigation.navigate("Song")
        } >
            <View>
                <Text style={styles.trackName}>{item.name}</Text>
                <Text style={styles.artist}>{item.artists && item.artists.length > 0 ? item.artists[0].name : 'Unknown Artist'}</Text>
            </View>
        </Pressable>
    );
};

export default AlbumSongItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15
    },
    trackName: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    },
    artist: {
        fontSize: 13,
        color: "#6a5874",
    },
});
