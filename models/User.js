import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others", "Rather Not Say"], required: true },
  dob: { type: Date, required: true },
  country: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;