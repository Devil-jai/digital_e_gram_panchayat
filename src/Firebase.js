import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaXXO74ZSmsGRMeL8K8XAba0QC2SEl5-I",
  authDomain: "digital-e-gram-panchayat-3028d.firebaseapp.com",
  projectId: "digital-e-gram-panchayat-3028d",
  storageBucket: "digital-e-gram-panchayat-3028d.firebasestorage.app",
  messagingSenderId: "97051302435",
  appId: "1:97051302435:web:2c1407453813cc46a4af96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)