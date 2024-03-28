import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// make sure to download lin grad expo


const ProfileScreen = () => {
    return (
        <LinearGradient
            colors={['rgba(113,77,120,1)', 'rgba(146,99,154,1)', 'rgba(181,139,188,1)']}
            style={styles.container}
        >        
        <SafeAreaView style={styles.container}> 

            <View style={styles.userInfoContainer}>
                <Image
                    source={{uri: 'https://via.placeholder.com/150'}}
                    style={styles.profileImage}
                />
                
                <Text style={styles.name}>John Doe</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.recentlyPlayedContainer}>
                <Text>Recently Played</Text>
                <ScrollView 
                    style={styles.scrollView}
                    horizontal={true}
                >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                            <Image
                                source={{uri: 'https://via.placeholder.com/150'}}
                                style={styles.recentImage}
                            />
                        </View>
                </ScrollView>

            </View>




            <View style={styles.navigationBar}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => trackAnalytics('Photos')}
                >
                    <Text style={styles.navButtonText}>Photos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => trackAnalytics('Favorite Music')}
                >
                    <Text style={styles.navButtonText}>Favorite Music</Text>
                </TouchableOpacity>
                {/* Add more navigation options as needed */}
            </View>
            </SafeAreaView>
        </LinearGradient>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    userInfoContainer: {
        alignItems: 'center',
        justifyContent: 'top',
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
    imageContainer: {
        flexDirection: 'row',
    },
    recentImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10,
    },

    recentlyPlayedContainer: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 30,
        },
    scrollView: {
        marginTop: 10,
        marginBottom: 10,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'bottom',
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

