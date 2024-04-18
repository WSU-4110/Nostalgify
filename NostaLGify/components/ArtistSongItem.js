import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArtistSongItem = ({ item, index }) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() =>
            navigation.navigate("Song")
        } >
            <View style={styles.numberContainer}>
                <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View>
                <Text style={styles.trackName}>{item.name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15
    },
    numberContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    numberText: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    trackName: {
        fontSize: 15,
        color: "white",
        fontWeight: "bold"
    },
    artist: {
        fontSize: 13,
        color: "white",
    },
});

export default ArtistSongItem;
