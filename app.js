// ===============================
// Falaa Freebies - Firebase Setup
// ===============================

// Your real Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebies.firebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com", // fixed bucket name
  messagingSenderId: "842425176920",
  appId: "1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};

// Initialize Firebase (only once)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ===============================
// Global Helper Functions
// ===============================

// Logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Error logging out: " + error.message);
  });
}

// Format Firestore timestamp
function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate();
  return date.toLocaleString();
}

// Auth check → redirect to login if not signed in
auth.onAuthStateChanged((user) => {
  if (!user && !window.location.pathname.endsWith("index.html")) {
    window.location.href = "index.html";
  }
});