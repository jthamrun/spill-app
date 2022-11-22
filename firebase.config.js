// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPddsm1WaA2Rkj0U-tc341i4R4i_NCm-w",
  authDomain: "spill-app-55bed.firebaseapp.com",
  projectId: "spill-app-55bed",
  storageBucket: "spill-app-55bed.appspot.com",
  messagingSenderId: "988764767741",
  appId: "1:988764767741:web:293a1d7ddfc11a293b0594",
  measurementId: "G-371XWMP97D",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
