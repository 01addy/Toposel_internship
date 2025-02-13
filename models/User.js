// The User.js file defines the User schema using Mongoose, which represents how user data is stored in the MongoDB database.

import mongoose from "mongoose"; // Importing Mongoose to define the schema and interact with MongoDB

// Defining the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others", "Rather Not Say"], required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema); // Creating the User model from the schema

export default User;
