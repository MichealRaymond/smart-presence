import mongoose, { Schema } from "mongoose";

//creat a schema
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: true,
      trim: true,
    },
    gender: { type: String, enum: ["male", "female"] },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // department: { type: Schema.Types.ObjectId, ref: "Department" },
  },
  { timestamps: true }
);

//create model
const User = mongoose.model("User", userSchema);

export default User;
