import instance from '../config/axios';

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export const authLoginAPI = async (phoneNumber, password) => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) throw new Error('No access token found');

    const URL_API = `${AUTH_URL}/login`;

    const data = {
        phoneNumber,
        password,
    };

    return instance.post(URL_API, data);
};
