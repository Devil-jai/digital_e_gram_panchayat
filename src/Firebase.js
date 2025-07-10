import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbLV8q1gUis4IfjGzLwlReGIKqoLqQLeI",
  authDomain: "digital-e-gram-panchayat-5fd3d.firebaseapp.com",
  projectId: "digital-e-gram-panchayat-5fd3d",
  storageBucket: "digital-e-gram-panchayat-5fd3d.firebasestorage.app",
  messagingSenderId: "172268278551",
  appId: "1:172268278551:web:2443dbca90100fdc531d52"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)