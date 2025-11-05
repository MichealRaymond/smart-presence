import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

export const auth = async (req, res, next) => {
  // get token from header
  const authorization = req.get("Authorization");

  // validate token format
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Invalid or Missing Token" });
  }
  const token = authorization.replace("Bearer ", "").trim();
  try {
    const decoded = jwt.verify(token, jwt_secret);

    if (!decoded || !decoded?.id) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    // check if user still exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid or Expired Token" });
  }
};
