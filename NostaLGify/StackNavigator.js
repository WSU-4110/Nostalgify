import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import CamScreen from './screens/CamScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import { Entypo, AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import LikedSongScreen from './screens/LikedSongScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 4,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
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
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search-circle-sharp" size={24} color="white" />
            ) : (
              <Ionicons name="search-circle-outline" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CamScreen}
        options={{
          tabBarLabel: 'Camera',
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="camera" size={24} color="white" />
            ) : (
              <AntDesign name="camerao" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="white" />
            ) : (
              <FontAwesome name="user-circle-o" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          headerShown: false,
          tabBarLabelStyle: { color: 'white' },
          tabBarIcon: ({ focused }) => (
            <AntDesign name="setting" size={24} color="white" />
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
            headerShown: true,
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
