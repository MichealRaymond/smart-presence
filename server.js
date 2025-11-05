import express from "express";
import { connectDB } from "./config/database/database.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import auth from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", auth);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  connectDB();
  console.log(`Application is running on port ${port}`);
});
