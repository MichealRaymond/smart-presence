import User from "../models/User.js";
import Face from "../models/Face.js";
import Profile from "../models/Profile.js";
import Role from "../models/Role.js";
import { regSchema } from "../validations/reg.validate.js";
import z from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { embeddingsCheck } from "../utils/functions.js";

// register logic
export const register = async (req, res) => {
  // check for results
  const results = regSchema.safeParse(req.body);
  if (!results.success) {
    const errors = z.flattenError(results.error);
    return res.status(400).json({ success: false, errors: errors.fieldErrors });
  }

  const { firstname, lastname, email, gender, password } = req.body;

  //   check if email exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  //   hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user
  const user = new User({
    firstname,
    lastname,
    email,
    gender,
    password: hashedPassword,
  });

  //   save doc
  await user.save();

  //   generate token
  const token = generateToken(user);

  const { password: pwd, ...userData } = user._doc;

  return res.status(200).json({
    message: "User registered successfully",
    user: userData,
    token,
  });
};

export const faceReg = async (req, res) => {
  const user = req.user;
  const { embeddings } = req.body;

  try {
    // check embeddings length and if it is array
    if (
      !embeddings ||
      !Array.isArray(embeddings) ||
      embeddings.length !== 128
    ) {
      return res.status(400).json({ error: "Invalid or missing embeddings" });
    }

    // check if user exist
    const userExists = await Face.findOne({ user: user._id });
    if (userExists) {
      userExists.embeddings = embeddings;
      await userExists.save();
      return res.status(200).json({ message: "Face embeddings updated" });
    }

    // if user not found save
    const newFace = new Face({
      user: user._id,
      embeddings,
    });

    await newFace.save();
    return res
      .status(201)
      .json({ message: "Face registered successfully", face: newFace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while saving face data" });
  }
};

export const verifyFace = async (req, res) => {
  const user = req.user;
  const { embeddings } = req.body;

  try {
    if (
      !embeddings ||
      !Array.isArray(embeddings) ||
      embeddings.length !== 128
    ) {
      return res.status(400).json({ error: "Invalid or missing embeddings" });
    }
    // check if user exist
    const userExists = await Face.findOne({ user: user._id });
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // check if the embeddings are the same
    const embeddingsMatch = embeddingsCheck(
      embeddings,
      userExists.embeddings,
      0.35
    );

    if (!embeddingsMatch) {
      return res.status(400).json({
        success: false,
        message: "Face does not match",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Face Match Confirmed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while verifying face data" });
  }
};
