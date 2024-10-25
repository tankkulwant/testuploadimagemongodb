// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import Firebase Auth if needed
import { getStorage } from 'firebase/storage';  // Import Firebase Storage if needed

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvE1OkC6X2Zs2G3jzCMk5d3HEIy-BGhJM",
    authDomain: "mernshared12.firebaseapp.com",
    projectId: "mernshared12",
    storageBucket: "mernshared12.appspot.com",
    messagingSenderId: "655357062872",
    appId: "1:655357062872:web:a56aeb8036d0fe9c9831ad",
    measurementId: "G-0ZJKBW17QR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
