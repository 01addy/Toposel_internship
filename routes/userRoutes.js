// userRoutes.js file manages user-related operations, like searching for a user by email or username, while ensuring authorization via middleware.

import express from "express"; // Importing Express to create a router
import User from "../models/User.js"; // Importing the User model to interact with the database
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to authenticate requests

const router = express.Router(); // Creating a new router instance

// Searching user by email or username (Protected Route)
router.get("/", authMiddleware, async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Please provide a username or email" });
      }

      // Find user by email or username while excluding the password field
      const user = await User.findOne({
        $or: [{ username: query }, { email: query }],
      }).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user); // Return user data if found
    } catch (error) {
      console.error("Error searching for user:", error);
      res.status(500).json({ message: "Server error" });
    }
});

export default router;
