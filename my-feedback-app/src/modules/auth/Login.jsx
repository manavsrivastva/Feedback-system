import React from "react";
import { auth, GoogleAuthProvider } from "../../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = ({ onLoginSuccess }) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      onLoginSuccess(result.user);
    } catch (error) {
      console.error("Google Sign-in failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {/* You can add Facebook or email/password options here */}
    </div>
  );
};

export default Login;
