import instance from '../config/axios';

const ADMIN_URL = import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:3000';

export const addNewProductAPI = async (data) => {
    const URL_API = `${ADMIN_URL}/add-product`;

    return instance.post(URL_API, data);
};

export const deleteProductAPI = async (id) => {
    const URL_API = `${ADMIN_URL}/delete-product/${id}`;

    return instance.delete(URL_API);
};
