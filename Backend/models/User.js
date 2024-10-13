const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  username: { type: String, required: true },
  userAccess: { type: String, enum: ["user", "admin"], default: "user" },
  savedResponses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
