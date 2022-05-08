const mongoose = require("mongoose");

const UserData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserData);
