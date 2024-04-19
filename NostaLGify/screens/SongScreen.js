import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { listFiles, deleteFile } from '../firebase-config';

async function fetchWebApi(endpoint, method, body, token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let url = `https://api.spotify.com/${endpoint}`;
    if (method === 'GET' && body) {
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
    }
    const res = await fetch(url, {
        headers,
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });
    return await res.json();
}

async function getTrackInfo(token, trackId) {
    return await fetchWebApi(`v1/tracks/${trackId}`, 'GET', null, token);
}

const SongScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { trackId } = route.params;

    const [trackImage, setTrackImage] = useState([]);
    const [trackName, setTrackName] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const fileList = await listFiles();
                setFiles(fileList);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        const fetchTrackInfo = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const trackInfoData = await getTrackInfo(accessToken, trackId);
                    if (trackInfoData?.name) {
                        setTrackName(trackInfoData.name);
                    } else {
                        setTrackImage(null);
                    }

                    if (trackInfoData?.album) {
                        setTrackImage(trackInfoData.album.images);
                    } else {
                        setTrackImage(null);
                    }
                } else {
                    console.error('Access token not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching artist items', error);
            }
        };

        fetchTrackInfo();
        fetchImages();
    }, [trackId]);

    const openModal = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    const deleteImage = async () => {
        try {
            await deleteFile(selectedImage); // Assuming you have a deleteFile function
            const updatedFiles = files.filter(file => file.uri !== selectedImage);
            setFiles(updatedFiles);
            closeModal();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <LinearGradient
            colors={['#cca2b7', '#ab8ca4', '#7f6581', '#6a5874', '#583b55']}
            style={[styles.container, { flex: 1 }]}
        >
            <View style={{ marginTop: 60, marginLeft: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {trackImage && trackImage.length > 0 && (
                <Image
                    source={{ uri: trackImage[0]?.url }}
                    style={{
                        width: 250,
                        height: 250,
                        marginTop: 20,
                        alignSelf: 'center',
                    }}
                />
            )}
            <Text style={{ marginTop: 30, marginBottom: 20, marginLeft: 10, fontSize: 24, fontWeight: "bold", color: "white" }}>{trackName}</Text>

            <View style={styles.container}>
                <ScrollView horizontal style={styles.galleryContainer}>
                    {files.map((file, index) => (
                        <TouchableOpacity key={index} onPress={() => openModal(file.uri)}>
                            <Image source={{ uri: file.uri }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <Image source={{ uri: selectedImage }} style={styles.modalImage} />
                    <View style={styles.modalButtonContainer}>
                        <Button title="Delete" onPress={deleteImage} />
                        <Button title="Close" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
        </LinearGradient>
    );
};

export default SongScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    galleryContainer: {
        position: 'absolute',
        bottom: 150,
        left: 0,
        right: 0,
        height: 120,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 10,
    },
    backButton: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalImage: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
    },
    modalButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});
