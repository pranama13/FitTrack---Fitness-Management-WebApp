import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data.data);
                } catch (err) {
                    // If token is invalid, log out the user
                    console.error("Failed to fetch user", err);
                    handleSetToken(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, [token]);

    const handleSetToken = useCallback((newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
            setUser(null); // Clear user data on logout
        }
        setToken(newToken);
    }, []);

    const value = { token, setToken: handleSetToken, user, setUser, loading };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};