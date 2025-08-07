// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "hostelmate-ai-2aup1",
  appId: "1:508300914614:web:0e968634c84c417f7edb17",
  storageBucket: "hostelmate-ai-2aup1.firebasestorage.app",
  apiKey: "AIzaSyC11nL3KHw7YbSvU-muXXqok5fTV8xW-UQ",
  authDomain: "hostelmate-ai-2aup1.firebaseapp.com",
  messagingSenderId: "508300914614",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
