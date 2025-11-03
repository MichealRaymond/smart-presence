import mongoose, { Schema } from 'mongoose';

//creat a schema
const userSchema = new Schema({
    firstname: { type: String, minLength: 2, maxLength: 18, required: true, trim: true },
    lastname: { type: String, minLength: 2, maxLength: 18, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female'] },

    //gender: { enum: ['male', 'female'] },
    password: { type: String, minLength: 6, maxLength: 12, required: true },
    email: { type: String, minLength: 6, maxLength: 12 },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },

    //email: { type: String, minLength: 6, maxLength: 12 }
},
    { timestamps: true });

//create model
const User = mongoose.model('User', userSchema);

export default User;
