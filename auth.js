import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { 
  doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Grab elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const msgDiv = document.getElementById("msg");

// ✅ Utility: show message
function showMsg(text, isError = false) {
  msgDiv.textContent = text;
  msgDiv.style.color = isError ? "red" : "green";
}

// ✅ Register
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    if (!role) {
      showMsg("Please choose a role", true);
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Save role in Firestore
      await setDoc(doc(db, "users", uid), { email, role });

      showMsg("✅ Registered successfully! You can now log in.");
      registerForm.reset();
    } catch (err) {
      showMsg("❌ " + err.message, true);
    }
  });
}

// ✅ Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      // Fetch role from Firestore
      const docSnap = await getDoc(doc(db, "users", uid));
      const role = docSnap.exists() ? docSnap.data().role : "unknown";

      showMsg(`✅ Welcome back! Role: ${role}`);

      // Example redirect (adjust as needed)
      if (role === "giver") window.location.href = "giver.html";
      else if (role === "taker") window.location.href = "taker.html";
      else if (role === "both") window.location.href = "both.html";
      else window.location.href = "browse.html";

    } catch (err) {
      showMsg("❌ " + err.message, true);
    }
  });
}

// ✅ Optional: Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("No user signed in");
  }
});
