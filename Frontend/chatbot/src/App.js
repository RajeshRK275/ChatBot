import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Chatbot from "./Components/ChatBot/ChatBot";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Login from "./Components/Login/Login"; // Import the Login component

function App() {
  const [user, setUser] = useState(null); // Manage user state

  const handleLogin = (userData) => {
    console.log("UserData -> ", userData);
    setUser(userData); // Set user data after login
  };

  const handleLogout = () => {
    setUser(null); // Reset user state
    localStorage.removeItem("token"); // Clear the token from local storage
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              user.role === "admin" ? ( // Check if user is admin
                <Navigate to="/admin" />
              ) : (
                <Chatbot onLogout={handleLogout} />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            user ? (
              user.role === "admin" ? (
                <ThemeProvider theme={theme}>
                  <AdminPanel onLogout={handleLogout} />
                </ThemeProvider>
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
