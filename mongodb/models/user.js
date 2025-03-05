const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema"); // ✅ Import the schema

const User = mongoose.model("User", userSchema);

module.exports = User; // ✅ Export the model
