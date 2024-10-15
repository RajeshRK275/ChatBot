import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import UserTable from "./UserTable"; // Ensure this path is correct

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users with saved responses from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://chat-bot-server-chi.vercel.app/api/users/users-with-responses"
        );
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
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Admin Panel
        </Typography>
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
