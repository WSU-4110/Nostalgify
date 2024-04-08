import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import AccessTokenSingleton from '../AccessTokenSingleton';

const accessTokenInstance = AccessTokenSingleton.getInstance();
accessTokenInstance.setAccessToken('accessToken');

const accessToken = accessTokenInstance.getAccessToken();

const SearchScreen = () => {
    const navigation = useNavigation();
    return (   
        <View style={{ backgroundColor: '#cca2b7', flex: 1, paddingTop: 20 }}>
            <Text style={{ marginLeft: 10, fontSize:30, fontWeight: "bold", color: "#583b55"}}> Your Library </Text>
            <View style={{backgroundColor: '#cca2b7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20}}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="playlist-music-outline"
                        size={20}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 15, fontWeight: "bold" }}>Playlists</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome6
                        name="record-vinyl"
                        size={20}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 15, fontWeight: "bold" }}>Albums</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="microphone-variant"
                        size={20}
                        color="#6a5874"
                    />

                    <Text style={{ color: "#6a5874", fontSize: 15, fontWeight: "bold"}}>Artists</Text>
                </View>
            </View>

            <ScrollView>
                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 15,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                    <Pressable
                        style={{
                        width: 55,
                        height: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                    >
                        <AntDesign name="heart" size={24} color="#ab8ca4" />
                    </Pressable>
                    </LinearGradient>

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Liked Songs
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 1
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 2
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 3
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 4
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 5
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 6
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 7
                    </Text>
                </Pressable>

                <Pressable
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flex: 1,
                    marginHorizontal: 7,
                    backgroundColor: "#cca2b7",
                    borderRadius: 4,
                    elevation: 3,
                    }}
                >
                    <Feather name="square" size={70} color="#7f6581" />

                    <Text style={{ color: "#6a5874", fontSize: 13, fontWeight: "bold" }}>
                        Playlist 8
                    </Text>
                </Pressable>

               

            </ScrollView>
        </View>
    )
};

export default SearchScreen;
const styles = StyleSheet.create({})
