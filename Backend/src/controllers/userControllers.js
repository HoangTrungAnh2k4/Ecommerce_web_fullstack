const db = require('../config/db');
const bcrypt = require('bcryptjs');
const util = require('util');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userControllers = {
    test: async (req, res) => {
        try {
            db.query("SELECT * FROM equipment WHERE type = 'ssd'", (err, results) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({ message: results });
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
            const userResult = await dbQuery(
                'INSERT INTO user (name, email, address, phoneNumber) VALUES (?, ?, ?, ?)',
                [name, email, address, phone],
            );

            const userId = userResult.insertId; // Lấy ID của user vừa tạo

            const hash = bcrypt.hashSync(password, 10);

            // Bước 2: Chèn vào bảng auth_credentials (sau khi bước 1 hoàn thành)
            await dbQuery('INSERT INTO auth_credentials (user_id, phoneNumber , password) VALUES (?,?, ?)', [
                userId,
                phone,
                hash,
            ]);

            // Thành công
            res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Database query error:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Số điện thoại này đã được đăng ký. Vui lòng dùng số khác.' });
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    login: (req, res) => {
        try {
            const { phoneNumber, password } = req.body;

            const sql = 'SELECT * FROM auth_credentials WHERE phoneNumber = ?';

            db.query(sql, [phoneNumber], (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ message: 'Invalid phoneNumber or password' });
                }

                const user = results[0];

                // Kiểm tra mật khẩu
                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }

                // Đăng nhập thành công
                const payload = {
                    phoneNumber: phoneNumber,
                };

                const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });

                return res.status(200).json({
                    message: access_token,
                    user: {
                        phoneNumber: user.phoneNumber,
                    },
                });
            });
        } catch (error) {
            console.error('Database query error: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = userControllers;
