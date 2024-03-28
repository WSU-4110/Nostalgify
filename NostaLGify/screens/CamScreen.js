import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { listFiles, uploadToFirebase } from './firebase-config';

const CamScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [files, setFiles] = useState([]);
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
      const fileList = await listFiles();
      setFiles(fileList);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const takePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      let photo = await cameraRef.current.takePictureAsync();
      await uploadToFirebase(photo.uri, `photo_${Date.now()}.jpg`);
      fetchImages(); // Refresh the gallery after taking a photo
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
        fetchImages(); // Refresh the gallery after selecting an image
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      console.error('Error picking image:', error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={cameraRef}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView horizontal style={styles.galleryContainer}>
        {files.map((file, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(file.uri)}>
            <Image source={{ uri: file.uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Green color
    paddingHorizontal: 20,
    paddingVertical: 12, // Increased padding for better touchability
    borderRadius: 8, // Increased border radius for rounded corners
    marginHorizontal: 10,
    marginBottom: 20, // Margin bottom to separate buttons from the gallery
    elevation: 2, // Shadow for better visual depth
  },
  buttonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Centered text alignment
  },
  galleryContainer: {
    position: 'absolute',
    bottom: 90, // Position gallery container at the bottom
    left: 0,
    right: 0,
    height: 120, // Adjust the height as needed
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    margin: 10,
  },
});

export default CamScreen;
