import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    emailOtp: { type: String},
    isEmailVerified: { type: Boolean, default: false },
    avatar: { type: String, required: true, },
}, { timestamps: true })

export default mongoose.model('User', userschema);