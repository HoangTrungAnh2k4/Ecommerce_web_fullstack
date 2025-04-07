const userService = require('../services/userServices');

const userControllers = {
    test: async (req, res) => {
        try {
            const results = await userService.test();
            res.status(200).json(results);
        } catch (err) {
            console.error(err);
            switch (err.message) {
                case 'NO_DATA_FOUND':
                    return res.status(404).json({ message: 'No equipment data found' });
                case 'TABLE_NOT_FOUND':
                    return res.status(500).json({ message: 'Equipment table does not exist' });
                case 'DATABASE_ERROR':
                    return res.status(500).json({ message: 'Database query error' });
                default:
                    return res.status(500).json({ message: 'Internal server error' });
            }
        }
    },
};

module.exports = userControllers;
