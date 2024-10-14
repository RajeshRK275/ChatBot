const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const responseRoutes = require("./routes/responseRoutes");
const app = express();
const cors = require("cors");

// Connect to the database
connectDB();

app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
