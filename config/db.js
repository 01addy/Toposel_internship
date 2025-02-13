//The db.js file is responsible for establishing a connection to the MongoDB database using Mongoose.

import mongoose from "mongoose"; // Importing the Mongoose library for MongoDB interaction

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
