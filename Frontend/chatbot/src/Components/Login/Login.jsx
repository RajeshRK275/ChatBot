// Login.js
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { StyledContainer, StyledLoginBox } from "./LoginStyles";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login({ onLogin }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "DEV"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_PRODUCTION_BACKEND_URL;

  console.log("Environment --> : ", process.env.REACT_APP_ENVIRONMENT);
  console.log("Development Environment URL : ", process.env.REACT_APP_API_URL);
  console.log(
    "Production Environment URL : ",
    process.env.REACT_APP_PRODUCTION_BACKEND_URL
  );

  console.log("API are called in this URL -> : ", apiUrl);

  const handleLogin = async () => {
    console.log("API URL:", process.env.PRODUCTION_BACKEND_URL);

    console.log("Entered Credentials : ", userEmail, " pwd -> ", password);
    try {
      console.log("This Api is being called :-> ", `${apiUrl}/users/login`);
      const response = await axios.post(`${apiUrl}/users/login`, {
        email: userEmail,
        password,
      });
      console.log("---- User Logged In ----");
      const { token } = response.data;
      console.log("---- Token ---->>>>>", token);

      // Decode the token to get user role and details (optional)
      const decoded = jwtDecode(token); // Assuming you use jwt-decode library
      onLogin({ role: decoded.userAccess, userEmail }); // Adjust as per your token structure

      localStorage.setItem("token", token); // Store token in localStorage
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <StyledContainer>
      <StyledLoginBox>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}
        <TextField
          label="User Id"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          fullWidth
          sx={{
            borderRadius: "35px",
            backgroundColor: "#243642", // Change this to your desired color
            color: "#ffffff", // Text color
            "&:hover": {
              backgroundColor: "#387478", // Darker shade for hover effect
            },
          }}
        >
          Login
        </Button>
      </StyledLoginBox>
    </StyledContainer>
  );
}
