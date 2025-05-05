import React, { useState } from "react";
import "../styles/LoginPage.css";
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
} from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginAs, setLoginAs] = useState("user");

  const navigate = useNavigate();

  const handleLogin = async (asAnalyser) => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(asAnalyser ? "/dashboard" : "/home");
    } catch (error) {
      alert("Login failed!");
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    handleLogin(loginAs === "user" ? false : true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEmail("");
    setPassword("");
    setIsExistingUser(true);
  };

  const handleLoginWithCredentials = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(loginAs === "user" ? "/home" : "/dashboard");
    }, 2000);
  };

  const handleSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(loginAs === "user" ? "/home" : "/dashboard");
    }, 2000);
  };

  const handleSwitchToSignup = () => {
    setIsExistingUser(false);
  };

  const handleSwitchToLogin = () => {
    setIsExistingUser(true);
  };

  return (
    <div className={`login-container ${darkMode ? "dark" : "light"}`}>
      {/* Headline */}
      <div className="typewriter-container">
  <h1 className="typewriter-text">
    Your Voice Matters – Help Innovate with Philips
  </h1>
</div>

      {/* Background Beams */}
      <div className="background-beams">
        <div className="beam"></div>
        <div className="beam"></div>
        <div className="beam"></div>
      </div>

      {/* Login cards */}
      <div className="login-content">
        {/* Left side: Login as User */}
        <Box className="login-side user-side float-in-left">
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Login as User
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4 }}>
            Share your feedback and experience.
          </Typography>
          <Button
            variant="contained"
            className="login-btn"
            color="primary"
            fullWidth
            onClick={() => {
              setLoginAs("user");
              setOpenDialog(true);
            }}
          >
            Login as User
          </Button>
        </Box>

        {/* Divider */}
        <div className="divider"></div>

        {/* Right side: Login as Analyser */}
        <Box className="login-side analyser-side float-in-right">
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Login as Analyser
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4 }}>
            Analyze user feedback and insights.
          </Typography>
          <Button
            variant="outlined"
            className="login-btn"
            color="secondary"
            fullWidth
            onClick={() => {
              setLoginAs("analyser");
              setOpenDialog(true);
            }}
          >
            Login as Analyser
          </Button>
        </Box>
      </div>

      {/* Dialog Box for Login/Signup */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{isExistingUser ? "Login" : "Create an Account"}</DialogTitle>
        <DialogContent>
          {isExistingUser ? (
            <>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleGoogleLogin}
                sx={{ mb: 2 }}
              >
                Login with Google
              </Button>
              <Typography variant="body2" sx={{ marginBottom: 2 }}>
                Or, enter your credentials:
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="text"
                onClick={handleSwitchToSignup}
                sx={{ mb: 2 }}
              >
                New user? Create account
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="text"
                onClick={handleSwitchToLogin}
                sx={{ mb: 2 }}
              >
                Already have an account? Login
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={isExistingUser ? handleLoginWithCredentials : handleSignup}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isExistingUser ? "Login" : "Sign Up"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginPage;
