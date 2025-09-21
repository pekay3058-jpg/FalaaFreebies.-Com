// ✅ firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// 🔑 Your Firebase config (replace if needed)
const firebaseConfig = {
  apiKey: "AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebies.firebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com",
  messagingSenderId: "842425176920",
  appId: "1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make available globally
window.auth = auth;
window.db = db;

export { auth, db };
