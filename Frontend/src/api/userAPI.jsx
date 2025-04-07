import instance from '../config/axios';

const CLIENT_URL = import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000';

export const getListBestSellerAPI = async (type) => {
    return instance.get(`${CLIENT_URL}/test`);
};
