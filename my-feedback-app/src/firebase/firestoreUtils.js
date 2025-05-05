// src/firebase/firestoreUtils.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Save user to Firestore if not already present
export const saveUserToFirestore = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      provider: user.providerData[0]?.providerId || "email",
      createdAt: new Date().toISOString(),
    });
    console.log("✅ New user added to Firestore");
  } else {
    console.log("🔁 Existing user logged in");
  }
};
