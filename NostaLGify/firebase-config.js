import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID
} from "@env";

// Initialize Firebase
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);