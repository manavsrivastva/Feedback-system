// src/components/LogoutButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
