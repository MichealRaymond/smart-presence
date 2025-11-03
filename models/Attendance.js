//import mongoose, { schema } from 'mongoose';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const attendanceSchema = new schema({
    user: { type: schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present', required: true },
}, { timestamps: true });
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;