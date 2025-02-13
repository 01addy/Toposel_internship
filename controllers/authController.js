import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail} from "../utils/sendEmail.js";
import User from "../models/User.js";

// Registration of a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullname, gender, dob, country } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullname,
      gender,
      dob,
      country,
    });

    await newUser.save();
    await sendEmail(email, "Registration Successful!!");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          full_name: user.fullname,
          gender: user.gender,
          dob: user.dob,
          country: user.country,
          createdAt: user.createdAt,
        },
      });      
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Search User by username or email
export const searchUser = async (req, res) => {
    try {
      const { query } = req.body;

      if (!query) {
        return res.status(400).json({ message: "Please provide a username or email" });
      }
  
      const user = await User.findOne({
        $or: [{ email: query }, { username: query }],
      }).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        gender: user.gender,
        dob: user.dob,
        country: user.country,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
