import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
// Component for displaying user information
const UserInfo = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.userInfoContainer}>
            <Image
                source={{uri: 'https://via.placeholder.com/150'}}
                style={styles.profileImage}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.bio}>Mr.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity // Add the TouchableOpacity for settings navigation
                style={styles.navButton}
                onPress={() => navigation.navigate('Settings')} // Navigate to SettingsScreen
            >
                <FontAwesome name="cog" size={24} color="#007bff" />
            </TouchableOpacity>
        </View>
    );
}

// Component for displaying navigation options
const NavigationBar = () => {
    const navigation = useNavigation(); // Get navigation object
    const trackAnalytics = (option) => {
        console.log(`Selected option: ${option}`);
        // Replace this with actual analytics tracking code
    };

    return (
        <View style={styles.navigationBar}>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => {
                    trackAnalytics('Photos');
                    navigation.navigate('Photos'); // Navigate to Photos screen
                }}
            >
                <Text style={styles.navButtonText}>Photos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.navButton}
                onPress={() => {
                    trackAnalytics('Favorite Music');
                    navigation.navigate('FavoriteMusic'); // Navigate to FavoriteMusic screen
                }}
            >
                <Text style={styles.navButtonText}>Favorite Music</Text>
            </TouchableOpacity>
            {/* Add more navigation options as needed */}
        </View>
    );
}


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <UserInfo />
            <NavigationBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    userInfoContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 20,
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
});

export default ProfileScreen;
