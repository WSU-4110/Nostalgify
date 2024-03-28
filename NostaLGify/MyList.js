import React from 'react';
import { Text, View, FlatList, StyleSheet, Image } from 'react-native';

export default function MyFilesList({ files }) {

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={files}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // or other resizeMode as needed
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
});
