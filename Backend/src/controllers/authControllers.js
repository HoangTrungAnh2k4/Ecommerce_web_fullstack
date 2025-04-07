const authServices = require('../services/authServices');

const authControllers = {
    register: async (req, res) => {
        try {
            const result = await authServices.register(req.body);
            res.status(result.status).json(result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        const { phoneNumber, password } = req.body;

        try {
            const result = await authServices.login(phoneNumber, password);
            res.status(result.status).json(result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },
};

module.exports = authControllers;
