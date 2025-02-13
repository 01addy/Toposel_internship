//The authMiddleware.js file is a middleware function that ensures only authenticated users can access protected API routes.

import jwt from "jsonwebtoken";  // Library for generating JSON Web Tokens (JWT)

// Middleware to authenticate users based on JWT
const authMiddleware = (req, res, next) => {
  try {
    // Retrieving the token from the Authorization header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log to check token payload
    req.user = { id: decoded.userId };
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
