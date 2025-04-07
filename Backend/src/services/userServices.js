const pool = require('../config/db');

const userService = {
    test: async () => {
        try {
            const [results] = await pool.query("SELECT * FROM equipment WHERE type = 'ssd'");

            if (results.length === 0) {
                throw new Error('No data found');
            }

            return results;
        } catch (err) {
            console.error('Error:', err);
            if (err.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },
};

module.exports = userService;
