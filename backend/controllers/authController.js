import User from '../models/User.js';
import Workout from '../models/Workout.js';
import Meal from '../models/Meal.js';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(statusCode).json({ success: true, token });
};

export const register = async (req, res) => {
    const { name, email, password, telNumber, age, weight, height } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });
        const user = await User.create({ name, email, password, telNumber, age, weight, height });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password, token: twoFactorToken } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    try {
        const user = await User.findOne({ email }).select('+password +twoFactorSecret +twoFactorEnabled');
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        if (user.twoFactorEnabled) {
            if (!twoFactorToken) {
                return res.status(200).json({ success: true, twoFactorRequired: true });
            }
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token: twoFactorToken,
                window: 1
            });
            if (!verified) {
                return res.status(401).json({ success: false, message: 'Invalid 2FA token' });
            }
        }
        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json({ success: true, data: req.user });
};

export const updateDetails = async (req, res) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        telNumber: req.body.telNumber,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
    };
    try {
        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await Workout.deleteMany({ user: req.user.id });
        await Meal.deleteMany({ user: req.user.id });
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error while deleting account.' });
    }
};

export const enableTwoFactor = async (req, res) => {
    try {
        const secret = speakeasy.generateSecret({ name: `FitFlow (${req.user.email})` });
        await User.findByIdAndUpdate(req.user.id, { twoFactorSecret: secret.base32 });
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            if (err) return res.status(500).json({ success: false, message: 'Error generating QR code.' });
            res.status(200).json({ success: true, data: { qrCode: data_url, secret: secret.base32 } });
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const verifyTwoFactor = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user.twoFactorSecret) return res.status(400).json({ success: false, message: '2FA not enabled.' });
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token
        });
        if (verified) {
            user.twoFactorEnabled = true;
            await user.save();
            res.status(200).json({ success: true, message: '2FA enabled successfully.' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid 2FA token.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const disableTwoFactor = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            twoFactorEnabled: false,
            twoFactorSecret: undefined
        });
        res.status(200).json({ success: true, message: '2FA disabled successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
