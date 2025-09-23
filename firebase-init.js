// firebase-init.js

const firebaseConfig = {
  apiKey: "AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebies.firebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com", // fixed bucket name
  messagingSenderId: "842425176920",
  appId: "1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebies.firebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com", // fixed bucket name
  messagingSenderId: "842425176920",
  appId: "1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
