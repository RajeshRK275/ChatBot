import React from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import useFetchUsers from "../../Hooks/useFetchUser"; // Ensure this path is correct
import UserTable from "./UserTable"; // Ensure this path is correct

export default function AdminPanel() {
  const { users, loading, error } = useFetchUsers();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && <UserTable users={users} />}
    </Container>
  );
}
