// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBb2I_0gALtREUyfWjUZXzfaWkdJVyb2L8",
  authDomain: "amsr-1488d.firebaseapp.com",
  projectId: "amsr-1488d",
  storageBucket: "amsr-1488d.appspot.com",
  messagingSenderId: "14880866",
  appId: "1:14880866:web:293cd9b7647522dafe013b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth() 
export const db = getFirestore(app)