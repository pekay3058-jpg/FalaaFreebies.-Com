
// app.js

// Redirect users based on their role
function handleUserRedirect(user) {
  if (!user) {
    // Not logged in → always go to login page
    if (!window.location.pathname.endsWith("index.html")) {
      window.location.href = "index.html";
    }
  } else {
    // Logged in → check Firestore role
    db.collection("users").doc(user.uid).get().then((snap) => {
      const data = snap.data();
      if (!data) return;

      const role = data.role;
      if (role === "admin" && !window.location.pathname.endsWith("dashboard-admin.html")) {
        window.location.href = "dashboard-admin.html";
      } else if (role === "user" && !window.location.pathname.endsWith("dashboard-user.html")) {
        window.location.href = "dashboard-user.html";
      }
    }).catch((err) => {
      console.error("Error fetching role:", err);
    });
  }
}

// Watch auth state changes
auth.onAuthStateChanged((user) => {
  handleUserRedirect(user);
});

// Optional: logout button handler
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      }).catch((error) => {
        alert("Logout failed: " + error.message);
      });
    });
  }
});
