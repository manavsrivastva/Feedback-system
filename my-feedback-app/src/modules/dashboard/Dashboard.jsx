import React, { useEffect, useState } from "react";
import { getAllFeedback } from "./DashboardService";
import Charts from "./Charts";
import LogoutButton from "../../components/LogoutButton";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import "./Dashboard.css";

const Dashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      const feedback = await getAllFeedback();
      setFeedbackList(feedback);
      setFilteredList(feedback);
      setLoading(false);
    };
    fetchFeedback();
  }, []);

  const handleFilter = () => {
    const filtered = feedbackList.filter((fb) => {
      const matchesUser = filterUser
        ? fb.user?.toLowerCase().includes(filterUser.toLowerCase())
        : true;
      const matchesCategory = filterCategory ? fb.category === filterCategory : true;
      return matchesUser && matchesCategory;
    });
    setFilteredList(filtered);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#1e293b", color: "#ffffff" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <Typography variant="h4" className="philips-heading">
          PHILIPS
        </Typography>
        <LogoutButton />
      </Box>

      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          marginBottom: "2rem",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        Website Analysis
      </Typography>

      {/* Filters */}
      <Box sx={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Filter by User"
            variant="outlined"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            sx={{ flex: 1, backgroundColor: "#334155", borderRadius: 1 }}
          />
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            displayEmpty
            sx={{ backgroundColor: "#334155", flex: 1, borderRadius: 1 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Website">Website</MenuItem>
            <MenuItem value="Support">Support</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Apply Filter
          </Button>
        </Box>
      </Box>

      {/* Feedback Cards */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <CircularProgress />
        </Box>
      ) : filteredList.length === 0 ? (
        <Typography variant="h6" align="center">
          No feedback available.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          {filteredList.map((fb) => (
            <Grid item xs={12} sm={6} md={4} key={fb.id}>
              <Card sx={{ backgroundColor: "#334155", boxShadow: 2 }}>
                <CardContent>
                  {fb.user && (
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                      {fb.user}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ color: "#38bdf8" }}>
                    {fb.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ffffff" }}>
                    {fb.comment}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#ffffff", marginRight: "1rem" }}>
                      Rating: {fb.rating}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      {new Date(fb.timestamp?.seconds * 1000).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Chart */}
      <Charts data={filteredList} />
    </Box>
  );
};

export default Dashboard;
