import express from "express";
import dotenv from "dotenv";
import { register, faceReg, verifyFace } from "../controller/authController.js";
import { auth } from "../middleware/auth.middleware.js";

dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/face/register", auth, faceReg);
router.post("/face/verify", auth, verifyFace);

export default router;
