import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Rating,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  CircularProgress,
  Container,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import LogoutButton from "../components/LogoutButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import "../styles/Home.css"; // Ensure this file contains the background styles

const feedbackCategories = ["Product", "Service", "Website", "Support", "Other"];

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for the Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // To handle color, success by default

  const handleRatingChange = (value) => {
    setFeedback({ ...feedback, rating: value });
  };

  const handleCommentChange = (value) => {
    setFeedback({ ...feedback, comment: value });
  };

  const handleSubmitFeedback = async () => {
    if (selectedCategory === "" || feedback.rating === 0 || feedback.comment === "") {
      setSnackbarMessage("Please complete all fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "feedback"), {
        category: selectedCategory,
        rating: feedback.rating,
        comment: feedback.comment,
        timestamp: new Date(),
      });
      setSnackbarMessage("Feedback submitted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setFeedback({ rating: 0, comment: "" });
      setSelectedCategory("");
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setSnackbarMessage("Failed to submit feedback. Please try again later.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box className="home-container">
      <div className="background-beams"></div>

      {/* Logout Button at Top Right */}
      <Box sx={{ position: "absolute", top: 16, right: 24, zIndex: 10 }}>
        <LogoutButton />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 5 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4, mt: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            className="typewriter"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              mb: 1,
              fontFamily: "Poppins",
              letterSpacing: 1,
            }}
          >
            Feedback Portal
          </Typography>
          <Typography
            variant="subtitle1"
            className="sub-blink"
            sx={{ color: "#cbd5e1" }}
          >
            Help us improve by sharing your thoughts.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "90%",
                md: "75%",
                lg: "60%",
              },
            }}
          >
            <Paper
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#1e293b",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Typography variant="h5" sx={{ mb: 2, color: "#ffffff" }}>
                Share Your Feedback
              </Typography>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="category-label" sx={{ color: "#cbd5e1" }}>
                  Feedback Category
                </InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  label="Feedback Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    color: "#ffffff",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#64748b",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#38bdf8",
                    },
                    backgroundColor: "#334155",
                  }}
                >
                  {feedbackCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedCategory && (
                <Card sx={{ mb: 2, backgroundColor: "#1e293b", color: "#ffffff" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                      {selectedCategory} Feedback
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                      <Typography variant="body1" sx={{ mr: 2 }}>
                        Rating:
                      </Typography>
                      <Rating
                        value={feedback.rating}
                        onChange={(event, newValue) => handleRatingChange(newValue)}
                      />
                    </Box>
                    <TextField
                      label="Comment"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={feedback.comment}
                      onChange={(e) => handleCommentChange(e.target.value)}
                      sx={{
                        mb: 2,
                        input: { color: "#ffffff" },
                        textarea: { color: "#ffffff" },
                        label: { color: "#cbd5e1" },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#64748b",
                          },
                          "&:hover fieldset": {
                            borderColor: "#38bdf8",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#38bdf8",
                          },
                        },
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmitFeedback}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : "Submit Feedback"}
                    </Button>
                  </CardActions>
                </Card>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: snackbarSeverity === "success" ? "#4caf50" : "#d32f2f",
            padding: 1.5,
            borderRadius: 1,
            color: "#fff",
          }}
        >
          <CheckCircleIcon sx={{ color: "#ffffff", mr: 1 }} />
          <Typography variant="body2">{snackbarMessage}</Typography>
          <IconButton
            sx={{ color: "#ffffff", ml: 1 }}
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Snackbar>
    </Box>
  );
};

export default Home;
