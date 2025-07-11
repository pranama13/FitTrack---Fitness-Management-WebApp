import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { Flame, ShieldCheck } from 'lucide-react';

const AuthPage = () => {
    const { setToken } = useContext(AuthContext);
    const { showToast } = useToast();
    const [isLogin, setIsLogin] = useState(true);
    const [loginStep, setLoginStep] = useState('credentials'); // 'credentials' or '2fa'
    
    const [formData, setFormData] = useState({ name: '', email: '', telNumber: '', age: '', weight: '', height: '', password: '', confirmPassword: '' });
    const [twoFactorToken, setTwoFactorToken] = useState('');
    const [error, setError] = useState('');

    const { name, email, telNumber, age, weight, height, password, confirmPassword } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCredentialSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.twoFactorRequired) {
                setLoginStep('2fa'); // Move to the next step
            } else if (res.data.token) {
                setToken(res.data.token); // Login successful
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const handleTwoFactorSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password, token: twoFactorToken });
            if (res.data.token) {
                setToken(res.data.token);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid 2FA token.');
        }
    };
    
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return setError('Passwords do not match');
        setError('');
        try {
            const res = await api.post('/auth/register', formData);
            if (res.data.token) {
                showToast('Registration successful!', 'success');
                setToken(res.data.token);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setLoginStep('credentials');
        setError('');
    };

    const renderLoginForm = () => (
        <form onSubmit={handleCredentialSubmit} className="space-y-6">
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg">Log In</button>
        </form>
    );

    const renderTwoFactorForm = () => (
        <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
            <div className="text-center text-gray-300">
                <ShieldCheck className="mx-auto w-12 h-12 text-orange-400" />
                <p className="mt-2">Enter the code from your authenticator app.</p>
            </div>
            <input type="text" value={twoFactorToken} onChange={(e) => setTwoFactorToken(e.target.value)} placeholder="6-Digit Code" maxLength="6" required className="w-full p-3 text-center tracking-[1em] rounded-lg bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button type="submit" className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg">Verify</button>
        </form>
    );

    const renderRegisterForm = () => (
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
            {/* All registration fields... */}
            <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600"/>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600"/>
            <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600"/>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" required className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600"/>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg">Create Account</button>
        </form>
    );

    return (
        <div className="relative min-h-screen w-full">
            <video src="/login.mp4" autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0"/>
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <div className="flex items-center justify-center mb-8">
                        <Flame className="w-10 h-10 text-orange-500 mr-3" />
                        <h1 className="text-4xl font-bold text-white">FitTrack</h1>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700">
                        <h2 className="text-2xl font-bold text-center text-white mb-6">
                            {isLogin ? (loginStep === '2fa' ? 'Two-Factor Verification' : 'Login') : 'Create Account'}
                        </h2>
                        {error && <p className="text-red-400 text-sm text-center bg-red-900/50 p-2 rounded-md mb-4">{error}</p>}
                        {isLogin ? (loginStep === '2fa' ? renderTwoFactorForm() : renderLoginForm()) : renderRegisterForm()}
                        <p className="text-center text-gray-400 mt-6">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={toggleForm} className="font-semibold text-orange-400 hover:text-orange-300 ml-2">
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthPage;