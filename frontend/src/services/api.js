import axios from 'axios';

const api = axios.create({
    // Use Vite's syntax for environment variables
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor to add the JWT token to every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;