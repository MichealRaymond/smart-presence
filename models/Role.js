import mongoose, { schema } from 'mongoose';

const roleschema = new schema({
    name: { type: String, required: true, unique: true, trim: true },
    permission: { type: String },
}, { timestamps: true });
const Role = mongoose.model('Role', roleschema);    

export default Role;