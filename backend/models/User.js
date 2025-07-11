import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    telNumber: { type: String },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    password: { type: String, required: true, minlength: 6, select: false },
    // --- 2FA Fields ---
    twoFactorSecret: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;