// auth.js

import { auth, db, storage } from "../firebase-init.js";

// Initialize Firebase (uses config from firebase-config.js)
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Register a new user
async function registerUser(email, password, role) {
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(cred.user.uid).set({
      email,
      role
    });
    return { uid: cred.user.uid, role };
  } catch (error) {
    console.error("Error registering user:", error.message);
    alert(error.message);
  }
}

// Login user
async function loginUser(email, password) {
  try {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const snap = await db.collection("users").doc(cred.user.uid).get();
    return { uid: cred.user.uid, role: snap.data().role };
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert(error.message);
  }
}

// Logout user
async function signOutUser() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error.message);
    alert(error.message);
  }
}
