const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authServices = {
    register: async (data) => {
        try {
            const { name, email, address, phone, password } = data;

            // Bước 1: Chèn vào bảng user
            const [rows] = await pool.query(
                'INSERT INTO user (name, email, address, phoneNumber) VALUES (?, ?, ?, ?)',
                [name, email, address, phone],
            );

            const userId = rows.insertId; // Lấy ID của user vừa tạo

            const hash = bcrypt.hashSync(password, 10);

            // Bước 2: Chèn vào bảng auth_credentials (sau khi bước 1 hoàn thành)
            await pool.query('INSERT INTO auth_credentials (user_id, phoneNumber , password) VALUES (?,?, ?)', [
                userId,
                phone,
                hash,
            ]);

            // Thành công
            return {
                status: 200,
                message: 'Đăng ký thành công',
            };
        } catch (error) {
            console.error('Database query error:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return { status: 400, message: 'Số điện thoại này đã được đăng ký. Vui lòng dùng số khác.' };
            }

            return { status: 500, message: 'Internal Server Error' };
        }
    },

    login: async (phoneNumber, password) => {
        try {
            const sql = 'SELECT * FROM auth_credentials WHERE phoneNumber = ?';

            const [rows, fields] = await pool.query(sql, [phoneNumber]);
            if (rows.length === 0) {
                return { status: 401, message: 'Invalid phoneNumber or password' };
            }

            const user = rows[0];
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return { status: 401, message: 'Invalid phoneNumber or password' };
            }

            const [userName] = await pool.query('select name from user where id = ?', [user.user_id]);

            const payload = { phoneNumber };
            const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });

            return {
                status: 200,
                data: {
                    access_token,
                    user: {
                        phoneNumber: user.phoneNumber,
                        userName: userName[0].name,
                    },
                },
            };
        } catch (error) {
            console.error('Database query error:', error);

            return { status: 500, message: 'Internal Server Error' };
        }
    },
};

module.exports = authServices;
