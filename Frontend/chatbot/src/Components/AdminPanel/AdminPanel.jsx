import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Button,
} from "@mui/material";
import UserTable from "./UserTable"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

export default function AdminPanel({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "DEV"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_PRODUCTION_BACKEND_URL;

  // Fetch users with saved responses from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/users-with-responses`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    console.log("Logout button clicked"); // Debugging line
    onLogout(); // Call the onLogout function passed from App.js
    navigate("/"); // Redirect to the landing page
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        width: "100vw", // Full width
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Box
        sx={{
          mt: 4,
          mb: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // Align items horizontally
          alignItems: "center", // Center vertically
        }}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          Admin Panel
        </Typography>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#243642", // Change this to your desired color
            color: "#ffffff", // Text color
            "&:hover": {
              backgroundColor: "#387478", // Darker shade for hover effect
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Paper
        sx={{
          padding: 2,
          backgroundColor: "background.paper",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && <UserTable users={users} />}
      </Paper>
    </Container>
  );
}
