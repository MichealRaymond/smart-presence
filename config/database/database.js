import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectUrl = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    // connect to the database
    mongoose.connect(connectUrl);
    console.log("Database Connected successfully");
  } catch (error) {
    console.log("Connection Failed: " + error);
  }
};
