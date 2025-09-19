import { auth, db } from "./firebase-init.js";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  doc, setDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const msg = document.getElementById("msg");

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm["loginEmail"].value;
  const password = loginForm["loginPassword"].value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    msg.textContent = "✅ Login successful!";
  } catch (err) {
    msg.textContent = "❌ " + err.message;
  }
});

// Register
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = registerForm["regEmail"].value;
  const password = registerForm["regPassword"].value;
  const role = registerForm["regRole"].value;

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info to Firestore (under "users" collection)
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: role,
      createdAt: new Date()
    });

    msg.textContent = "✅ Registration successful!";
  } catch (err) {
    msg.textContent = "❌ " + err.message;
  }
});
