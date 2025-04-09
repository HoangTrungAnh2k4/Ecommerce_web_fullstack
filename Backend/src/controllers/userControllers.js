const userService = require('../services/userServices');

const userControllers = {
    test: async (req, res) => {
        try {
            const result = await userService.test();
            res.status(result.status).json(result.message || result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },
};

module.exports = userControllers;
