import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String, maxLength: 200 },
  phone: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;