// auth.js
import { auth, db } from "../firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const el = id => document.getElementById(id);
const status = el("status");

const show = (id) => { document.querySelectorAll("#auth-forms > div").forEach(d=>d.classList.add("hidden")); document.getElementById(id).classList.remove("hidden"); };

document.getElementById("show-register").addEventListener("click", e => { e.preventDefault(); show("register"); });
document.getElementById("show-login").addEventListener("click", e => { e.preventDefault(); show("login"); });

el("btn-register").addEventListener("click", async () => {
  status.textContent = "";
  const name = el("reg-name").value.trim();
  const email = el("reg-email").value.trim();
  const pass = el("reg-pass").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  if (!name || !email || pass.length < 6) { status.textContent = "Enter name, valid email and password (6+ chars)."; return; }
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCred.user.uid;
    // Create profile in firestore
    await setDoc(doc(db, "users", uid), {
      name, email, role, createdAt: new Date()
    });
    // auth state listener will redirect
  } catch (err) {
    console.error(err);
    status.textContent = err.message || "Registration failed.";
  }
});

el("btn-login").addEventListener("click", async () => {
  status.textContent = "";
  const email = el("login-email").value.trim();
  const pass = el("login-pass").value;
  if (!email || !pass) { status.textContent = "Enter email and password."; return; }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    console.error(err);
    status.textContent = err.message || "Login failed.";
  }
});

// Redirect according to role
onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const data = userDoc.exists() ? userDoc.data() : null;
    const role = data?.role || "taker";
    // Choose route based on role
    if (role === "giver") location.replace("/dashboards/giver.html");
    else if (role === "both") location.replace("/dashboards/both.html");
    else location.replace("/dashboards/taker.html");
  } catch (e) {
    console.error("Redirect error", e);
    status.textContent = "Failed to load profile.";
  }
});
