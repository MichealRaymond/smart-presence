import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// load .env file content into process.env (to access variables in .env file)
dotenv.config();

//import { connectDB } from "./config/database.js";

//const connectURL = "mongodb+srv://yiaga007_db_user:SVLBACKEND123@alinko1.meq7fcl.mongodb.net/";
const connectURL = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(connectURL);

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Connection failed" + error);
  } finally {
    client.close();
  }
};

//export default connectDB;
