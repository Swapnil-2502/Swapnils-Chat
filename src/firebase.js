
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfQwsLI3oJ_Y7RKcdTMZWqYKjHiLs4ZCU",
  authDomain: "swapnil-chat.firebaseapp.com",
  projectId: "swapnil-chat",
  storageBucket: "swapnil-chat.appspot.com",
  messagingSenderId: "875878989534",
  appId: "1:875878989534:web:78b7ffd7594567c23e4c4f",
  measurementId: "G-4WC9N3CZRL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore()