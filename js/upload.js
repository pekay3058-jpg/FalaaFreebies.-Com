// upload.js
import { storage } from "../firebase-init.js";
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebase.js/11.0.1/firebase-storage.js";
import { createItem } from "./firestore.js";

/**
 * Usage: call uploadAndCreateItem(file, metadata)
 * metadata: { title, description, category, ownerId }
 */

export const uploadAndCreateItem = (file, metadata, onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file"));
    const fileRef = ref(storage, `items/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(pct);
      },
      (err) => reject(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const itemId = await createItem({ ...metadata, imageURL: url });
          resolve({ itemId, imageURL: url });
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};
