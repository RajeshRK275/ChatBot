import React, { useEffect, useState } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { getUserIdFromToken } from "../../Utility/authUtils"; // Utility to get user id
import { useNavigate } from "react-router-dom";

export default function HistoryTab({ onSelectResponse, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [fetchedResponses, setFetchedResponses] = useState([]); // Responses from DB
  const theme = useTheme();
  const navigate = useNavigate();

  // API URL for saving responses (based on environment)
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "DEV"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_PRODUCTION_BACKEND_URL;

  // Toggle drawer function
  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  // Function to fetch responses from the database
  const fetchSavedResponses = async () => {
    const userId = getUserIdFromToken(); // Get the user id

    if (!userId) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const res = await axios.get(`${apiUrl}/responses/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Fetched responses from DB:", res.data);

      if (res.status === 200) {
        setFetchedResponses(res.data); // Set the fetched responses from DB
      } else {
        throw new Error("Failed to fetch responses.");
      }
    } catch (error) {
      console.error("Error fetching responses from database:", error);
    }
  };

  // Fetch responses when component is mounted
  useEffect(() => {
    fetchSavedResponses();
  }, []);

  const handleLogout = () => {
    console.log("Logout button clicked"); // Debugging line
    onLogout(); // Call the onLogout function passed from App.js
    navigate("/"); // Redirect to the landing page
  };

  return (
    <div>
      {/* Burger icon to open the drawer */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => toggleDrawer(true)}
        sx={{
          position: "absolute",
          top: 2,
          left: 10,
          color: theme.palette.text.primary,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for history responses */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            flexDirection: "column",
            height: "100vh", // Full height of the viewport
          },
        }}
      >
        <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
          {" "}
          {/* Scrollable list area */}
          <List>
            {fetchedResponses.length > 0 ? (
              fetchedResponses.map((response, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    onSelectResponse(response); // When clicked, show the response in Chatbot
                    toggleDrawer(false); // Close the drawer
                  }}
                >
                  <ListItemText
                    primary={response.summary || `Response ${index + 1}`}
                    secondary={response.result_text.slice(0, 50) + "..."}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No saved responses" />
              </ListItem>
            )}
          </List>
        </Box>

        <Button
          variant="outlined"
          sx={{
            backgroundColor: "#243642", // Change this to your desired color
            color: "#ffffff", // Text color
            "&:hover": {
              backgroundColor: "#387478", // Darker shade for hover effect
            },
            margin: 2, // Add margin for spacing
            alignSelf: "center", // Center the button horizontally
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Drawer>
    </div>
  );
}
