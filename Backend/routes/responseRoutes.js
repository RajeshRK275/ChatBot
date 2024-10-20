const express = require("express");
const router = express.Router();
const {
  saveResponse,
  getUserResponses,
} = require("../controllers/responseController");
// const { authenticate } = require("../middlewares/auth");

// router.post("/", authenticate, saveResponse); // Save response
// router.get("/user/:userId", authenticate, getUserResponses); // Get user responses

router.post("/:userId/add-response", saveResponse); // Save response for a user
router.get("/user/:userId", getUserResponses); // Get responses of a specific user

module.exports = router;
