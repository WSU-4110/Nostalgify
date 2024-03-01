import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
                <Image
                    source={{uri: item.image}}
                    style={styles.itemImage}
                />
                <View style={styles.itemText}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemArtist}>{item.artist}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
        </View>
    );

    const data = [
        { id: '1', name: 'Song 1', artist: 'Artist 1', image: 'https://via.placeholder.com/150' },
        { id: '2', name: 'Song 2', artist: 'Artist 2', image: 'https://via.placeholder.com/150' },
        // Add more items here
    ];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    itemText: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemArtist: {
        fontSize: 14,
        color: '#666',
    },
    playButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    playButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
