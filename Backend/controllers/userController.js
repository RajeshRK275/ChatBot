const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Register a new user
exports.register = async (req, res) => {
  console.log("---- Inside User Register ----");

  const { email, password, username, isAdmin } = req.body;

  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAccess = isAdmin ? "admin" : "user";
    const user = new User({
      email,
      password: hashedPassword,
      username,
      userAccess: userAccess,
    });
    console.log("New User ->", user);
    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", accessLevel });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  console.log("---- Inside User login ----");

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, userAccess: user.userAccess },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the all the user's along with their responses
exports.getAllUsersWithResponses = async (req, res) => {
  try {
    console.log("----Inside getAllUsersWithResponses----");
    // Find all users and populate the savedResponses field
    const users = await User.find()
      .populate("savedResponses") // Populate the savedResponses array with Response documents
      .select("-password"); // Exclude the password field for security
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
