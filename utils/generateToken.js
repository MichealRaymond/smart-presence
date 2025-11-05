import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    jwt_secret,
    {
      expiresIn: "1hr",
    }
  );
};
