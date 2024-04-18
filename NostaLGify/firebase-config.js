import { initializeApp, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_AUTH_DOMAIN
} from "@env";

// Initialize Firebase
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    appId: FIREBASE_APP_ID
};

if (!getApp().length) {
    initializeApp(firebaseConfig);
}

const firestore = getFirestore();

const listFiles = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'photosConnectedToSongs'));
        const files = querySnapshot.docs.map(doc => ({
            name: doc.id,
            uri: doc.data().uri // Adjust this line based on your document structure
        }));
        return files;
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
    uploadToFirebase,
    listFiles
};