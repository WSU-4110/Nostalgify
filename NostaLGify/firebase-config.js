import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from "@env";

// Initialize Firebase
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    appId: FIREBASE_APP_ID,
    projectID: FIREBASE_PROJECT_ID,
    authDomain: FIREBASE_AUTH_DOMAIN
};

const fbApp = getApp();
const fbStorage = getStorage();
const firestore = getFirestore(fbApp);

const listFiles = async () => {
    try {
        const imageRef = collection(firestore, 'photosConnectedToSongs', 'DL72C7HLRAL6QBW6WHUL');
        const q = query(imageRef, where('FieldValue', '==', 'Image'));
        const querySnapshot = await getDocs(q);
        
        const fileList = [];
        querySnapshot.forEach((doc) => {
            fileList.push({
                name: doc.id,
                uri: doc.data().FieldValue,
            });
        });

        return fileList;
    } catch (error) {
        console.error('Error listing files:', error);
        return [];
    }
};

const uploadToFirebase = async (uri, name, onprogress) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();
        
        const imageRef = collection(firestore, 'photosConnectedToSongs', 'DL72C7HLRAL6QBW6WHUL');
        
        // Upload image to Firestore
        const docRef = await addDoc(imageRef, {
            FieldValue: name, // Assuming name is the image URL or any relevant field
            timestamp: serverTimestamp(), // Store upload timestamp
        });

        return docRef.id; // Return document ID if needed
    } catch (error) {
        console.error('Error uploading image to Firestore:', error);
        throw error;
    }
};

export {
    fbApp,
    fbStorage,
    uploadToFirebase,
    listFiles
};
