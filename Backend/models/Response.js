const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  summary: { type: String, required: true },
  result_text: { type: String, required: true },
  result_table_path: { type: String },
  result_visualization_path: { type: String },
  error: { type: String, default: null },
});

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
