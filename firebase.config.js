// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnEz6whEnAfhijRN3dLS7AiYfU6zt54O8",
  authDomain: "spill-app-76ebc.firebaseapp.com",
  projectId: "spill-app-76ebc",
  storageBucket: "spill-app-76ebc.appspot.com",
  messagingSenderId: "772176048598",
  appId: "1:772176048598:web:c96e51044530372f56f477",
  measurementId: "G-F891V5PP6Z",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { app, db, auth };
