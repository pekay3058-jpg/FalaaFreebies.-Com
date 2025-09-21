// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js"; // adjust path

const firebaseConfig = {
  apiKey:"AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebiesfirebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com",
  messagingSenderId:"842425176920",
  appId:1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for other JS files
export { auth, db, storage };

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

