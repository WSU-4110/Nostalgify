import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import CamScreen2 from './screens/CamScreen2';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Entypo, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import LikedSongScreen from './screens/LikedSongScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import SongScreen from './screens/SongScreen';
import AlbumSongScreen from './screens/AlbumSongScreen';
import ArtistScreen from './screens/ArtistScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#413244',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 4,
          borderTopWidth: 6,
          borderTopColor: '#725876',
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarLabelStyle: { color: 'white', fontWeight: 'bold', fontSize: 12},
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Library',
          headerShown: false,
          tabBarLabelStyle: {  color: 'white', fontWeight: 'bold', fontSize: 12 },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="library-music" size={24} color="white" />
            ) : (
              <MaterialIcons name="library-music" size={24} color="white" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarLabelStyle: {  color: 'white', fontWeight: 'bold', fontSize: 12},
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="white" />
            ) : (
              <FontAwesome name="user-circle-o" size={24} color="white" />
            ),
        }}
      />

    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={({ navigation }) => ({
            headerRight: () => (
              <AntDesign
                name="setting"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Settings')}
              />
            ),
            headerShown: false,
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          })}
        />
        <Stack.Screen
          name="Liked"
          component={LikedSongScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Camera"
          component={CamScreen2}
          options={{headerShown: false }}
        />
  
        <Stack.Screen
          name="Song"
          component={SongScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AlbumSong"
          component={AlbumSongScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Artist"
          component={ArtistScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
