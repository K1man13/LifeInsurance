// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgiVM7LpKywOmfrMDXZ2sTciYgopzY-DI",
    authDomain: "life-insuarance.firebaseapp.com",
    projectId: "life-insuarance",
    storageBucket: "life-insuarance.appspot.com",
    messagingSenderId: "272431553767",
    appId: "1:272431553767:web:4addab58f673234d079642",
    measurementId: "G-KFGEJXDXCB"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services for use in other parts of your app
export { auth, db };