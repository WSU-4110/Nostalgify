import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

const FollowedArtistItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;

    return (
        <Pressable style={styles.container}>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View>
                <Text style={styles.artistName}>{item.name}</Text>
                <Text style={styles.followers}>{item.followers.total} Followers</Text>
            </View>
        </Pressable>
    );
};

export default FollowedArtistItem;

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
        borderRadius: 5,
    },
    artistName: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    },
    followers: {
        fontSize: 13,
        color: "#6a5874",
    },
});
