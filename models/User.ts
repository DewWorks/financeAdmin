import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, strict: false }); // strict: false allows other fields to exist without schema definition

export default mongoose.models.User || mongoose.model('User', UserSchema);
