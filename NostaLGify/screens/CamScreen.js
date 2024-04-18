import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CamScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      let photo = await cameraRef.current.takePictureAsync();
      // Upload photo logic will be added here
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
        // Upload picked image logic will be added here
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={cameraType} ref={cameraRef} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    textAlign: 'center',
  },
});

export default CamScreen;
