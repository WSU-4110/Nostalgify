import { initializeApp, getApp, getApps } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
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
    storageBucket: FIREBASE_STORAGE_BUCKET,
    appId: FIREBASE_APP_ID,
    projectID: FIREBASE_PROJECT_ID,
    authDomain: FIREBASE_AUTH_DOMAIN
};

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

const listFiles = async () => {
    const storage = getStorage();
    const listRef = ref(storage, 'images');

    try {
        const listResp = await listAll(listRef);
        const filePromises = listResp.items.map(async (item) => {
            const downloadURL = await getDownloadURL(item);
            return {
                name: item.name,
                uri: downloadURL,
            };
        });

        // Wait for all file promises to resolve
        return await Promise.all(filePromises);
    } catch (error) {
        console.error('Error listing files:', error);
        return [];
    }
};

const uploadToFirebase = async (uri, name, onprogress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(getStorage(), `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onprogress && onprogress(progress);
            },
            (error) => {
                reject(error)
            },
            async () => {
                const DownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({
                    DownloadURL,
                    metadata: uploadTask.snapshot.metadata,
                })
            }
        );
    });
};

export {
    fbApp,
    fbStorage,
    uploadToFirebase,
    listFiles
};