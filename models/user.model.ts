import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter email"],
  },
  password: {
    type: String,
    required: [true, "Enter password"],
  },
});

export const User = mongoose.model("User", UserScheme);
