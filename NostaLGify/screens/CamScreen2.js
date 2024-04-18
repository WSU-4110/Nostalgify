import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, Alert, StyleSheet, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { listFiles, uploadToFirebase } from '../firebase-config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchWebApi(endpoint, method, body, token) {
    const headers = {
        Authorization: `Bearer ${token}`,
      };
      let url = `https://api.spotify.com/${endpoint}`;
      if (method === 'GET' && body) {
        // If it's a GET request and there's a body, encode it into the URL
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
      }
      const res = await fetch(url, {
        headers,
        method,
        body: method !== 'GET' ? JSON.stringify(body) : undefined, // Only include body for non-GET requests
      });
      return await res.json();
  }
  
  async function getCurrentTrack(token) {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/player/get-the-users-currently-playing-track/
    return await fetchWebApi(
      'v1/me/player/recently-played?limit=1', 'GET', null, token
    );
  }


const CamScreen2 = () => {
    const [trackId, setTrackId] = useState(null); // State for track ID

    useEffect(() => {
      fetchCurrentTrack();
    }, []);
  
    const fetchCurrentTrack = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          const currentTrackData = await getCurrentTrack(accessToken);
          if (currentTrackData.items && currentTrackData.items.length > 0) {
            const track = currentTrackData.items[0].track;
            setTrackId(track.id); // Set the track ID
            console.log("Track ID:", track.id);
          } else {
            setTrackId(null); // Set trackId to null if no track is playing
            console.log("No track currently playing");
          }
        } else {
          console.error('Access token not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching current track:', error);
      }
    };



    
    
    















  const [myList, setMyList] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [files, setFiles] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    fetchImages();
  }, []);




  const fetchImages = async () => {
    try {
      const fileList = await listFiles(); // Get the list of files
  
      // Filter the fileList based on trackId and image name
      const newFilesList = fileList.filter(file => {
        // Check if the file's name exists in myList and its trackId matches the current trackId
        return myList.some(([trackID, imageName]) => trackID === trackId && file.name === imageName);
      });
  
      setFiles(newFilesList); // Set the filtered files list
      console.log(newFilesList);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  


  
  const takePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      let photo = await cameraRef.current.takePictureAsync();
      const fileName = `photo_${Date.now()}.jpg`;
      await uploadToFirebase(photo.uri, fileName);
      setMyList(prevList => [...prevList, [trackId,fileName]]);
      fetchImages();
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      console.error('Error taking photo:', error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        await uploadToFirebase(result.uri, `photo_${Date.now()}.jpg`);
        fetchImages();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      console.error('Error picking image:', error);
    }
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setIsModalVisible(false);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < files.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>TakePhoto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log(myList)}>
          <Text style={styles.buttonText}>Display myList</Text>
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal style={styles.galleryContainer}>
        {files.map((file, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(index)}>
            <Image source={{ uri: file.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: files[selectedImageIndex]?.uri }} style={styles.modalImage} />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handlePreviousImage} disabled={selectedImageIndex === 0}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextImage} disabled={selectedImageIndex === files.length - 1}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 20,
    elevation: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    //fontWeight: 'bold',
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CamScreen2;

