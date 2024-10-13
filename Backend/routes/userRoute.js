// routes/user.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a user response
router.post("/", async (req, res) => {
  const { username, query, response } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    user.savedResponses.push({ query, response });
    await user.save();
    res.status(201).json(user);
  } else {
    const newUser = new User({
      username,
      savedResponses: [{ query, response }],
    });
    await newUser.save();
    res.status(201).json(newUser);
  }
});

module.exports = router;
