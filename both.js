// both.js
import { auth, db } from "./firebase-init.js";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const bothGiveForm = document.getElementById("bothGiveForm");
const bothItemName = document.getElementById("bothItemName");
const bothItemDesc = document.getElementById("bothItemDesc");
const bothResults = document.getElementById("bothResults");
const bothSearchInput = document.getElementById("bothSearchInput");
const bothCategories = document.getElementById("bothCategories");
const logoutBtn = document.getElementById("logoutBtn");

// Post new item
bothGiveForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, "items"), {
      name: bothItemName.value,
      desc: bothItemDesc.value,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      role: "both"
    });
    bothItemName.value = "";
    bothItemDesc.value = "";
    loadItems();
  } catch (err) {
    console.error("Error posting item:", err);
  }
});

// Browse items
async function loadItems(filter = {}) {
  bothResults.innerHTML = "<p>Loading items...</p>";
  const snap = await getDocs(collection(db, "items"));
  let items = snap.docs.map(doc => doc.data());

  if (filter.category) {
    items = items.filter(item => item.category === filter.category);
  }
  if (filter.search) {
    const term = filter.search.toLowerCase();
    items = items.filter(item => item.name.toLowerCase().includes(term));
  }

  if (items.length === 0) {
    bothResults.innerHTML = "<p>No items available.</p>";
    return;
  }

  bothResults.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<strong>${item.name}</strong><br>${item.desc || ""}`;
    bothResults.appendChild(div);
  });
}

// Event listeners
bothSearchInput.addEventListener("input", () => {
  loadItems({ search: bothSearchInput.value, category: bothCategories.value });
});
bothCategories.addEventListener("change", () => {
  loadItems({ search: bothSearchInput.value, category: bothCategories.value });
});
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// Initial load
loadItems();
