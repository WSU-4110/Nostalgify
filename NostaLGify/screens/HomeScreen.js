import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const HomeScreen = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#cca2b7', paddingTop: 50}}>
            <View style={{ flexDirection: 'row', marginBotton: 100}}>
                <AntDesign
                    name="hearto"
                    size={50}
                    color="black"
                    style={{
                        marginLeft: 30,
                        marginTop: 50,
                    }}
                />

                <Text style={{ marginTop: 80, marginLeft: 30, fontSize: 30, fontWeight: "bold" }}>Liked Songs</Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                    name="playlist-music-outline"
                    size={50}
                    color="black"
                    style={{
                        marginLeft: 30,
                        marginTop: 50
                     }}
                />

                <Text style={{ marginTop: 80, marginLeft: 30, fontSize: 30, fontWeight: "bold" }}>Playlists</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <FontAwesome6
                    name="record-vinyl"
                    size={50}
                    color="black"
                    style={{
                        marginLeft: 30,
                        marginTop: 50
                    }}
                />

                <Text style={{ marginTop: 80, marginLeft: 30, fontSize: 30, fontWeight: "bold" }}>Albums</Text>
            </View>

            <View style={{ flexDirection: 'row', marginBottom: 120}}>
                <MaterialCommunityIcons
                    name="microphone-variant"
                    size={50}
                    color="black"
                    style={{
                        marginLeft: 30,
                        marginTop: 50
                    }}
                />

                <Text style={{ marginTop: 80, marginLeft: 30, fontSize: 30, fontWeight: "bold"}}>Artists</Text>
            </View>
            
        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({})
