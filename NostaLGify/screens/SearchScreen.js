import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

const SearchScreen = () => {
    // Dummy data for demonstration
    const data = [
        { id: 1, artist: 'Artist 1', song: 'Song 1' },
        { id: 2, artist: 'Artist 2', song: 'Song 2' },
        { id: 3, artist: 'Artist 3', song: 'Song 3' },
        // Add more data as needed
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.item}>
                <Text style={styles.text}>{item.artist}</Text>
                <Text style={styles.text}>{item.song}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: '#cca2b7' }]}>
            <TextInput
                style={[styles.input, { color: '#583b55' }]}
                placeholder="Search..."
                placeholderTextColor="#7f5a83"
                marginTop={25}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: '#6a5874',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#583b55',
        borderRadius: 5,
        marginBottom: 10,
    },
    item: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: '#cca2b7',
    },
    button: {
        backgroundColor: '#cca2b7',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#6a5874',
        fontWeight: 'bold',
    },
});

export default SearchScreen;
