const adminServices = require('../services/adminServices');

const adminControllers = {
    addProduct: async (req, res) => {
        const { name, type, sold_quantity, price, discount, urlImage, best_seller } = req.body;
        console.log('Request body:', req.body); // Log the request body for debugging

        if (!name || !type || sold_quantity === undefined || price === undefined || discount === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // if (!Array.isArray(urlImage) || urlImage.length === 0) {
        //     return res.status(400).json({ error: 'urlImage must be an array and cannot be empty' });
        // }

        try {
            const result = await adminServices.addProduct({
                name,
                type,
                sold_quantity,
                price,
                discount,
                urlImage,
                best_seller,
            });
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            const result = await adminServices.deleteProduct(id);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    deleteRate: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            const result = await adminServices.deleteRate(id);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },
};

module.exports = adminControllers;
