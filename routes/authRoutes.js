import express from "express";
import { registerUser, loginUser, searchUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Search route
router.post("/search", authMiddleware, searchUser);


export default router;