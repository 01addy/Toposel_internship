import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Search user by email or username
router.get("/", authMiddleware, async (req, res) => {
    try {
      const { query } = req.query;
  
      if (!query) {
        return res.status(400).json({ message: "Please provide a username or email" });
      }
  
      const user = await User.findOne({
        $or: [{ username: query }, { email: query }],
      }).select("-password");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error searching for user:", error);
      res.status(500).json({ message: "Server error" });
    }
});

export default router;