import bcrypt from "bcryptjs";  //Library for Hashing Password
import jwt from "jsonwebtoken"; //Library for generating JSON Web Tokens (JWT)
import { sendEmail} from "../utils/sendEmail.js"; //Utility function used for sending emails
import User from "../models/User.js"; //Importing the User model

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

    //User Interface
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
    await sendEmail(email, "Registration Successful!!"); //Sending a confirmation email

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Extracting email and password from request body

    //Check whether user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Comparison of entered password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generating a JWT token with user ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // To Send success response with token and user details (excluding password)
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

      // Search for a user by email or username, excluding the password field
      const user = await User.findOne({
        $or: [{ email: query }, { username: query }],
      }).select("-password"); 
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Sending user details (excluding password) in response
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
