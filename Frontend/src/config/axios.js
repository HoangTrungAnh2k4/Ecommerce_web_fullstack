import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
