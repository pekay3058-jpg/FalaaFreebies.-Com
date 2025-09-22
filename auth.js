// /js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCB3TOwlnDAdh_x5NvLSCyORX_6oZbsZGc",
  authDomain: "falaa-freebies.firebaseapp.com",
  projectId: "falaa-freebies",
  storageBucket: "falaa-freebies.appspot.com",
  messagingSenderId: "842425176920",
  appId: "1:842425176920:web:aa538c8212f12dd41fcb2d",
  measurementId: "G-YQFW6R14L6"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const msg = document.getElementById("msg");

// Handle Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), { email, role });
      msg.textContent = "Registered successfully! Redirecting...";
      redirectToDashboard(role);
    } catch (err) {
      msg.textContent = err.message;
    }
  });
}

// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const docSnap = await getDoc(doc(db, "users", userCred.user.uid));
      if (docSnap.exists()) {
        const role = docSnap.data().role;
        msg.textContent = "Login successful! Redirecting...";
        redirectToDashboard(role);
      } else {
        msg.textContent = "No role found for this user.";
      }
    } catch (err) {
      msg.textContent = err.message;
    }
  });
}

// Redirect users by role
function redirectToDashboard(role) {
  if (role === "giver") {
    window.location.href = "giver.html";
  } else if (role === "taker") {
    window.location.href = "taker.html";
  } else if (role === "both") {
    window.location.href = "both.html";
  } else {
    msg.textContent = "Invalid role.";
  }
}

// Keep user logged in
onAuthStateChanged(auth, async (user) => {
  if (user && window.location.pathname.endsWith("index.html")) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      redirectToDashboard(docSnap.data().role);
    }
  }
});
