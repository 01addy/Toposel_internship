import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);


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

mongoose.connection.on("disconnected", () => {
    console.warn(" MongoDB Disconnected! Retrying...");
    connectDB();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const io = new Server(httpServer, {
    cors: false,
});

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


app.use((err, req, res, next) => {
    console.error(` Error: ${err.message}`);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
});


const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(` Server running on port ${PORT}`));

export { io };
