//The server.js file is the main entry point of the backend application. It:
//Initializes an Express server.
//Connects to MongoDB using Mongoose.
//Defines and mounts API routes (authRoutes and userRoutes).
//Sets up Socket.IO for real-time communication.
//Handles errors and listens on a specified port.

import express from "express"; // Importing Express for creating the server
import dotenv from "dotenv"; // Importing dotenv to load environment variables
import mongoose from "mongoose"; // Importing Mongoose for MongoDB connection
import { createServer } from "http"; // Importing HTTP module to create the server
import { Server } from "socket.io"; // Importing Socket.IO for real-time updates
import authRoutes from "./routes/authRoutes.js"; // Importing authentication routes
import userRoutes from "./routes/userRoutes.js"; // Importing user-related routes

dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating an Express application
const httpServer = createServer(app); // Creating an HTTP server for Express

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

// Reconnect to MongoDB if disconnected
mongoose.connection.on("disconnected", () => {
    console.warn(" MongoDB Disconnected! Retrying...");
    connectDB();
});

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defining the API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Initializing Socket.IO for real-time functionality
const io = new Server(httpServer, {
    cors: false,
});

// Handling client connections via WebSockets
io.on("connection", (socket) => {
    console.log(` Client Connected: ${socket.id}`);

    socket.on("eventUpdated", () => {
        console.log(" Event Updated - Broadcasting...");
        io.emit("refreshEvents");
    });

    socket.on("disconnect", () => {
        console.log(` Client Disconnected: ${socket.id}`);
    });
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(` Error: ${err.message}`);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(` Server running on port ${PORT}`));

export { io }; // Exporting io instance for use in other parts of the app
