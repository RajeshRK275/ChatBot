import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Chatbot from "./Components/ChatBot/ChatBot";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Login from "./Components/Login/Login"; // Import the Login component

function App() {
  const [user, setUser] = useState(null); // Manage user state

  const handleLogin = (userData) => {
    console.log("UserData -> ", userData);
    setUser(userData); // Set user data after login
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
                <Chatbot />
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
                <AdminPanel />
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
