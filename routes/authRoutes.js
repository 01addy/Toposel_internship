// The authRoutes.js file handles authentication-related routes such as user registration, login, and searching users.

import express from "express"; // Importing Express to create a router
import { registerUser, loginUser, searchUser } from "../controllers/authController.js"; // Importing controller functions for authentication
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware to protect routes

const router = express.Router(); // Creating a new router instance

// Signup route - Allows users to register
router.post("/signup", registerUser);

// Login route - Allows users to authenticate
router.post("/login", loginUser);

/ Search route - Allows searching for a user, protected by authentication middleware
router.post("/search", authMiddleware, searchUser);

export default router;
