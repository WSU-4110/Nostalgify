import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// Component for displaying user information
const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('John Doe');
    const [editedName, setEditedName] = useState('');
    const [image, setImage] = useState(null);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        setName(editedName);
        setIsEditing(false);
    };

    // useEffect(() => {
    //     (async () => {
    //         if (Platform.OS !== 'web') {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Sorry, we need camera roll permissions to make this work!');
    //             }
    //         }
    //     })();
    // }, []);

    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };
    // <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
    //             {image ? (
    //                 <Image source={{ uri: image }} style={styles.profileImage} />
    //             ) : (
    //                 <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
    //             )}
    //             <TouchableOpacity onPress={pickImage} style={styles.editIconContainer}>
    //                 <Image
    //                     source={require('../assets/edit-image.png')}
    //                     style={styles.editIconImage}
    //                 />
    //             </TouchableOpacity>
    //         </TouchableOpacity>

    return (
        <View style={styles.userInfoContainer}>
            <TouchableOpacity style={styles.profileImageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                )}
                <TouchableOpacity style={styles.editIconContainer}>
                    <Image
                        source={require('../assets/edit-image.png')}
                        style={styles.editIconImage}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
                {isEditing ? (
                    <View style={styles.editContainer}>
                        <TextInput
                            style={styles.editInput}
                            value={editedName}
                            onChangeText={text => setEditedName(text)}
                        />
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.name}>{name}</Text>
                        <TouchableOpacity onPress={handleEdit}>
                            <Image
                                source={require('../assets/pencil.png')}
                                style={styles.editIcon}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

// Component for displaying navigation options
const NavigationBar = () => {
    const trackAnalytics = (option) => {
        console.log(`Selected option: ${option}`);
        // Replace this with actual analytics tracking code
    };

    return (
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
    );
}


const ProfileScreen = () => {
    return (
        <View style={[styles.container, { backgroundColor: '#cca2b7' }]}>
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
    editIcon: {
        width: 24,
        height: 24,
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    editIconImage: {
        width: 37.5,
        height: 37.5,
        resizeMode: 'contain',
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#7f6581',
        borderRadius: 5,
        padding: 5,
    },
    saveText: {
        color: '#583b55',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editIcon: {
        width: 22.5,
        height: 22.5,
        marginLeft: 15,
    },
    button: {
        backgroundColor: '#6a5874',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#cca2b7',
        fontSize: 12,
    },
    navigationBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#7f6581',
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 20,
    },
    navButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#583b55',
    },
});

export default ProfileScreen;

