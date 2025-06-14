// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAobg1pNlOs0DYIcjYQCeyenZo6YNJOX_g",
  authDomain: "edustreak-e373d.firebaseapp.com",
  projectId: "edustreak-e373d",
  storageBucket: "edustreak-e373d.firebasestorage.app",
  messagingSenderId: "329929653291",
  appId: "1:329929653291:web:e2117fda3449da80c3fe6e",
  measurementId: "G-MF811G2L3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);