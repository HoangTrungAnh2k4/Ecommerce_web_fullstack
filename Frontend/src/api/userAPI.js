import instance from '../config/axios';

const CLIENT_URL = import.meta.env.VITE_CLIENT_API_URL || 'http://localhost:3000';

export const getListBestSellerAPI = async (type) => {
    return instance.get(`${CLIENT_URL}/list-best-seller`, {
        params: { type },
    });
};

export const getListEquipmentByTypeAPI = async (type) => {
    return instance.get(`${CLIENT_URL}/list-equipment/by-type`, {
        params: { type },
    });
};

export const getUserInforAPI = async () => {
    return instance.get(`${CLIENT_URL}/user-infor`);
};

export const postRateAPI = async (data) => {
    return instance.post(`${CLIENT_URL}/post-rate`, data);
};

export const getRateAPI = async (id) => {
    return instance.get(`${CLIENT_URL}/get-rate/${id}`);
};
