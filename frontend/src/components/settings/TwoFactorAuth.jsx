import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

const TwoFactorAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const { showToast } = useToast();
    const [setupData, setSetupData] = useState(null); 
    const [token, setToken] = useState('');

    const handleEnable = async () => {
        try {
            const res = await api.post('/auth/2fa/enable');
            setSetupData(res.data.data);
        } catch (err) {
            showToast('Failed to start 2FA setup.', 'error');
        }
    };

    const handleVerify = async () => {
        try {
            await api.post('/auth/2fa/verify', { token });
            setUser({ ...user, twoFactorEnabled: true });
            setSetupData(null);
            setToken('');
            showToast('2FA has been enabled!', 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Verification failed.', 'error');
        }
    };

    const handleDisable = async () => {
        try {
            await api.post('/auth/2fa/disable');
            setUser({ ...user, twoFactorEnabled: false });
            showToast('2FA has been disabled.', 'success');
        } catch (err) {
            showToast('Failed to disable 2FA.', 'error');
        }
    };

    if (!user) return null;

    if (user.twoFactorEnabled) {
        return (
            <div className="mt-4 p-4 bg-green-900/30 rounded-lg flex justify-between items-center">
                <p className="text-green-300">Two-Factor Authentication is enabled.</p>
                <button onClick={handleDisable} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Disable</button>
            </div>
        );
    }

    if (setupData) {
        return (
            <div className="mt-4 p-4 bg-slate-700/50 rounded-lg space-y-4">
                <p className="text-gray-300">1. Scan this QR code with your authenticator app (e.g., Google Authenticator).</p>
                <div className="flex justify-center">
                    <img src={setupData.qrCode} alt="2FA QR Code" className="bg-white p-2 rounded-lg" />
                </div>
                <p className="text-gray-300">2. Enter the 6-digit code from your app to verify and complete the setup.</p>
                <div className="flex gap-4">
                    <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="6-Digit Code" maxLength="6" className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600"/>
                    <button onClick={handleVerify} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Verify & Enable</button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg flex justify-between items-center">
            <p className="text-gray-300">Enhance your account security by enabling 2FA.</p>
            <button onClick={handleEnable} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Enable 2FA</button>
        </div>
    );
};
export default TwoFactorAuth;
