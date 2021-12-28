import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { 
    getStorage, 
    ref, 
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    list,
    listAll 
  } from "firebase/storage"
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})
const dbRef = getFirestore()
// Get a reference to the storage service, 
// which is used to create references in your storage bucket
const storage = getStorage(app)

export const storageBucket = {
    storage,
    ref,
    uploadBytes,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    list,
    listAll
}

export const firestore = {
    dbRef,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    onSnapshot,
    query,
    where
}
export const appAuth = app.auth()
export const firebaseAuth = firebase.auth
export default app
