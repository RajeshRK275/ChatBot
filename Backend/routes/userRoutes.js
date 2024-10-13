const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsersWithResponses,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/users-with-responses", getAllUsersWithResponses);

module.exports = router;
