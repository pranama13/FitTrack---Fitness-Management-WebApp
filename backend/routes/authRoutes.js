import express from 'express';
import { 
    register, 
    login, 
    getMe, 
    updateDetails, 
    deleteAccount,
    enableTwoFactor,
    verifyTwoFactor,
    disableTwoFactor
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.delete('/deleteaccount', protect, deleteAccount);

// --- 2FA Routes ---
router.post('/2fa/enable', protect, enableTwoFactor);
router.post('/2fa/verify', protect, verifyTwoFactor);
router.post('/2fa/disable', protect, disableTwoFactor);

export default router;