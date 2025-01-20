// Import the functions you need from the SDKs you need
// import { application } from "express";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  
  authDomain: "mern-estate-3321c.firebaseapp.com",
  projectId: "mern-estate-3321c",
  storageBucket: "mern-estate-3321c.firebasestorage.app",
  messagingSenderId: "52418480685",
  appId: "1:52418480685:web:b7f76b9802b956085746a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);