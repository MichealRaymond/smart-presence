import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["staff", "student"],
      default: "student",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const Role = mongoose.model("Role", roleSchema);

export default Role;
