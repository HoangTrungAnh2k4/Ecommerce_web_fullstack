const db = require('../config/db');
const bcrypt = require('bcryptjs');
const util = require('util');

const userControllers = {
    test: async (req, res) => {
        try {
            db.query("SELECT * FROM equipment WHERE type = 'ssd'", (err, results) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(results);
            });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    register: async (req, res) => {
        try {
            const dbQuery = util.promisify(db.query).bind(db); // Chuyển db.query thành promise

            const { name, email, address, phone, password } = req.body;

            // Bước 1: Chèn vào bảng user
            const userResult = await dbQuery('INSERT INTO user (name, email, address, phone) VALUES (?, ?, ?, ?)', [
                name,
                email,
                address,
                phone,
            ]);

            const userId = userResult.insertId; // Lấy ID của user vừa tạo

            const hash = bcrypt.hashSync(password, 10);

            // Bước 2: Chèn vào bảng auth_credentials (sau khi bước 1 hoàn thành)
            await dbQuery('INSERT INTO auth_credentials (user_id, username, password) VALUES (?,?, ?)', [
                userId,
                phone,
                hash,
            ]);

            // Thành công
            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Database query error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    login: (req, res) => {},
};

module.exports = userControllers;
