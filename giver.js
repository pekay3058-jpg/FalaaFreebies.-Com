// giver.js
import { auth, db } from "./firebase-init.js";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const giveForm = document.getElementById("giveForm");
const itemName = document.getElementById("itemName");
const itemDesc = document.getElementById("itemDesc");
const giverItems = document.getElementById("giverItems");
const logoutBtn = document.getElementById("logoutBtn");

// Post an item
giveForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "items"), {
      name: itemName.value,
      desc: itemDesc.value,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      role: "giver"
    });
    itemName.value = "";
    itemDesc.value = "";
    loadMyItems();
  } catch (err) {
    console.error("Error posting item:", err);
  }
});

// Load items created by this giver
async function loadMyItems() {
  giverItems.innerHTML = "<p>Loading your items...</p>";
  const q = query(collection(db, "items"), where("createdBy", "==", auth.currentUser.uid));
  const snap = await getDocs(q);

  if (snap.empty) {
    giverItems.innerHTML = "<p>No items posted yet.</p>";
    return;
  }

  giverItems.innerHTML = "";
  snap.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<strong>${data.name}</strong><br>${data.desc || ""}`;
    giverItems.appendChild(div);
  });
}

// Load items on start
loadMyItems();

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});
