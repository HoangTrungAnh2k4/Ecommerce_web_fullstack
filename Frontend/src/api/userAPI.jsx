import axios from 'axios';

const CLIENT_URL = import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000';

export const getListBestSeller = async (type) => {
    try {
        const response = await axios.get(`${CLIENT_URL}/product-best-seller?type=${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching best seller products:', error);
        throw error;
    }
};
