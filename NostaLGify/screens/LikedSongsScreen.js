import { Pressable, TextInput, ScrollView, input, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
/*
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQCPwRKg8YZCAx3aXe0zxnFoae2J2JHlUgwXK3kdHSQE0OXefN35ypxDEbede_0zCrfiSiBym8s0HxsYUnuOEbufOgqwIp3pH7C6R919bwd3yjOFEs5_fxMTJ427Ku9NqyqyOL5K_5WHYL8FQjUSf6E_7Hux8T8Q583RJOWBTOon4iZY-AFHLOtKqShU1i7dCaV9j9M6zFV3tjYwXe7ztStlmBPPi95_pyd9Jbbo57L2-PMnMkYFYFfy8dtVEiVikYVS';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);
*/

const LikedSongsScreen = () => {
    const navigation = useNavigation();
    const [InputDeviceInfo, setInput] = useState("");
    async function getSavedTracks() {
    
    }
    return (
        <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 40 }}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginHorizontal: 10 }}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </Pressable>

                <Pressable
                    style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Pressable
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            backgroundColor: "#42275a",
                            padding: 9,
                            flex: 1,
                            borderRadius: 3,
                            height: 38
                        }}
                    >
                        <AntDesign name="search1" size={20} color="white" />
                        <TextInput
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            placeholder="Find in Liked songs"
                            placeholderTextColor={"white"}
                            style={{fontWeight:"500"}}
                        />
                    </Pressable>

                    <Pressable
                        style={{
                            marginHorizontal: 10,
                            backgroundColor: "#42275a",
                            padding: 10,
                            borderRadius: 3,
                            height: 38
                        }}
                    >
                        <Text style={{color:"white"}}>Sort</Text>
                    </Pressable>
                </Pressable>

                <View style={{height:50}}/>
                <View style={{marginHorizontal: 10}}>
                    <Text style={{fontSize:19,fontWeight:"bold",color:"white"}}>Liked Songs</Text>
                    <Text style={{fontSize:13, color:"white", marginTop:5}}>540</Text>
                </View>

                
            </ScrollView>
        </LinearGradient>
    );
}



export default LikedSongsScreen;