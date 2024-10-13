// models/User.js
const mongoose = require("mongoose");

const SavedResponseSchema = new mongoose.Schema({
  query: String,
  response: String,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  savedResponses: [SavedResponseSchema],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
