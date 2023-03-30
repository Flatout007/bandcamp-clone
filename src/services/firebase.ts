import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"

import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

import { FirebaseStorage, getStorage } from "firebase/storage";


const firebaseConfig: FirebaseOptions = {

    apiKey: "AIzaSyCNtcQ7pZ7U1P8S2p-v7pEG3Df9AHWNAXI",
    authDomain: "bandcamp-clone.firebaseapp.com",
    projectId: "bandcamp-clone",
    storageBucket: "bandcamp-clone.appspot.com",
    messagingSenderId: "894309359888",
    appId: "1:894309359888:web:c0a158f5d392329c7b8595",
    measurementId: "G-V2XDGESN9J"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

// returns an auth object and grants access to firebase's auth system:
const auth: Auth = getAuth(app);

// returns a new google authentication object provided by firebase: 
const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

// Get a reference to the Firebase Storage service:
const storage: FirebaseStorage = getStorage(app);

export {storage, auth, googleAuth};

