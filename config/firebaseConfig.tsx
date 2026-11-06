// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "story-4ecb0.firebaseapp.com",

  projectId: "story-4ecb0",

  storageBucket: "story-4ecb0.firebasestorage.app",

  messagingSenderId: "360504705818",

  appId: "1:360504705818:web:b91aaf68aa4a7bf1a362a3",

  measurementId: "G-TQFDF7EEH2"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)