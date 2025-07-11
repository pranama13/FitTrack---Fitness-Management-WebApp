import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { Trash2 } from 'lucide-react';
import TwoFactorAuth from '../components/settings/TwoFactorAuth';

const AccountSettingsPage = () => {
    const { user, setUser, setToken } = useContext(AuthContext);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', telNumber: '', age: '', weight: '', height: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                telNumber: user.telNumber || '',
                age: user.age || '',
                weight: user.weight || '',
                height: user.height || ''
            });
        }
    }, [user]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put('/auth/updatedetails', formData);
            setUser(res.data.data);
            showToast('Profile updated successfully!', 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to update profile.', 'error');
        }
    };

    const handleDeleteAccount = async () => {
        if (true) { // In a real app, use a custom confirmation modal.
            try {
                await api.delete('/auth/deleteaccount');
                showToast('Account deleted successfully.', 'success');
                setToken(null);
            } catch (err) {
                showToast(err.response?.data?.message || 'Failed to delete account.', 'error');
            }
        }
    };

    return (
        <div className="bg-black-700/50 p-4 sm:p-8 rounded-xl border border-orange-500 max-w-4xl mx-auto backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
            <p className="text-gray-400 mb-8">Manage your profile, security, and account settings.</p>

            {/* Profile Information Section */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold text-white border-b border-orange-700 pb-2 mb-6">Profile Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        {/* Email Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        {/* Telephone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Telephone</label>
                            <input type="tel" name="telNumber" value={formData.telNumber} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                         {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Age</label>
                            <input type="number" name="age" value={formData.age} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                         {/* Weight */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Weight (kg)</label>
                            <input type="number" name="weight" value={formData.weight} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                         {/* Height */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Height (cm)</label>
                            <input type="number" name="height" value={formData.height} onChange={onChange} className="w-full p-2 rounded-lg bg-slate-800 border border-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Section */}
            <div className="mb-10">
                <h3 className="text-xl font-semibold text-white border-b border-slate-700 pb-2 mb-6">Security</h3>
                <TwoFactorAuth />
            </div>

            {/* Danger Zone Section */}
            <div>
                <h3 className="text-xl font-semibold text-red-500 border-b border-red-500/30 pb-2 mb-6">Danger Zone</h3>
                <div className="flex flex-col sm:flex-row justify-between items-center bg-red-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-300 mb-4 sm:mb-0 text-center sm:text-left">Once you delete your account, there is no going back.</p>
                    <button onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
                        <Trash2 size={16} /> Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AccountSettingsPage;