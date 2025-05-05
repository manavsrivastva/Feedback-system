// src/modules/auth/AuthService.js
import { auth, GoogleAuthProvider, FacebookAuthProvider } from "../../firebase/firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Google Sign-In
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Facebook Sign-In
export const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
};

// Email and Password Login
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Email and Password Signup
export const signUpWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
