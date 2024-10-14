const express = require("express");
const connectDB = require("../config/db"); // Updated path for Vercel
const userRoutes = require("../routes/userRoutes");
const responseRoutes = require("../routes/responseRoutes");
const cors = require("cors");

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/responses", responseRoutes);

app.use(
  "/api",
  (req, res, next) => {
    console.log("API Route Hit: ", req.path);
    next();
  },
  userRoutes
);

module.exports = app; // Export Express app
