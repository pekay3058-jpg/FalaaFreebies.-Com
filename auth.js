// auth.js
// Production-ready authentication + role save + redirect
import { auth, db } from "./firebase-init.js"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// DOM refs (these IDs match your index.html)
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const msgBox = document.getElementById("msg");

// small helper to show messages
function showMsg(text, isError = false) {
  if (!msgBox) {
    alert(text);
    return;
  }
  msgBox.textContent = text;
  msgBox.style.color = isError ? "red" : "green";
}

// Redirect helper by role
function redirectByRole(role) {
  if (role === "giver") window.location.href = "giver.html";
  else if (role === "taker") window.location.href = "taker.html";
  else if (role === "both") window.location.href = "both.html";
  else window.location.href = "index.html";
}

// ----- Registration -----
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("regEmail").value?.trim();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!email || !password || !role) {
      showMsg("Please fill all registration fields and choose a role.", true);
      return;
    }

    try {
      showMsg("Registering...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save role to Firestore under users/{uid}
      await setDoc(doc(db, "users", user.uid), {
        role,
        email: user.email,
        createdAt: new Date().toISOString()
      });

      showMsg("Registration successful. Redirecting...");
      // Redirect immediately to role dashboard
      setTimeout(() => redirectByRole(role), 700);

    } catch (error) {
      console.error("Registration error:", error);
      showMsg(error.message || "Registration failed", true);
    }
  });
}

// ----- Login -----
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value?.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      showMsg("Please enter email and password.", true);
      return;
    }

    try {
      showMsg("Signing in...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get role from Firestore and redirect
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        showMsg("Login successful. Redirecting...");
        setTimeout(() => redirectByRole(role), 600);
      } else {
        // No role saved — safe fallback: send to index and ask to re-register or choose role page
        showMsg("No role found for this account. Contact support.", true);
      }
    } catch (error) {
      console.error("Login error:", error);
      showMsg(error.message || "Login failed", true);
    }
  });
}

// ----- Sign out helper (if you have a logout button) -----
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      showMsg("Logged out.");
      setTimeout(() => (window.location.href = "index.html"), 400);
    } catch (err) {
      console.error("Logout error:", err);
      showMsg("Logout failed", true);
    }
  });
}

// ----- Auth state listener: ensures redirect if user is already logged in -----
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // If not logged in and not on index page, send to index
    if (!window.location.pathname.endsWith("index.html") && !window.location.pathname.endsWith("/")) {
      // allow pages like /index.html or root '/'
      // But don't auto-redirect when user is already at index (login page).
      // If you want different behavior, adjust here.
    }
    return;
  }

  // If logged in, ensure we are on the correct dashboard
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const role = userDoc.data().role;
      // If already on correct dashboard, do nothing
      const path = window.location.pathname.split("/").pop();
      if (
        (role === "giver" && path === "giver.html") ||
        (role === "taker" && path === "taker.html") ||
        (role === "both" && path === "both.html") ||
        path === "index.html" || path === ""
      ) {
        // already correct or on index -> do nothing (or redirect from index to dashboard)
        if (path === "index.html" || path === "") {
          // redirect from login page to dashboard
          redirectByRole(role);
        }
        return;
      }

      // If on wrong page, redirect to correct dashboard
      redirectByRole(role);
    } else {
      console.warn("User doc missing in users collection for uid:", user.uid);
    }
  } catch (err) {
    console.error("Auth state role fetch error:", err);
  }
});
