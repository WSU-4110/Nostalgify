import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArtistItem = ({ item }) => {
    const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : null;
    const navigation = useNavigation();
    
    return (
        <Pressable style={styles.container} onPress={() =>
            navigation.navigate("Artist", {
                item: item,
            })
        }>
            {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
            <View>
                <Text style={styles.artistName}>{item.name}</Text>
            </View>
        </Pressable>
    );
};

export default ArtistItem;

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
    artistName: {
        fontSize: 15,
        color: "#6a5874",
        fontWeight: "bold"
    }
});
