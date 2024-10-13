const Response = require("../models/Response");
const User = require("../models/User");
// const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");

// Save a response
exports.saveResponse = async (req, res) => {
  console.log("---- Inside Save Response ----");

  const {
    summary,
    result_text,
    result_table_path,
    result_visualization_path,
    error,
  } = req.body;
  const { userId } = req.params;

  console.log("User If -> ", userId);
  console.log(req.body);

  try {
    const newResponse = new Response({
      userId,
      summary,
      result_text,
      result_table_path,
      result_visualization_path,
      error,
    });
    await newResponse.save();

    console.log("**** Data saved in Response Collections *****");

    // Add response ID to user's savedResponses
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { savedResponses: newResponse._id } },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      console.error("User not found with ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }
    console.log("**** Response ID pushed to the corresponding user *****");

    res.status(201).json({ message: "Response saved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user responses
exports.getUserResponses = async (req, res) => {
  console.log("---- Inside get User Response ----");
  try {
    const responses = await Response.find({ userId: req.params.userId });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
