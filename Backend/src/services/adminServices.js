const pool = require('../config/db');

const adminServices = {
    addProduct: async (data) => {
        try {
            const { name, type, sold_quantity, price, discount, urlImage, best_seller } = data;

            const sql1 =
                'INSERT INTO equipment (name, type, sold_quantity, price, discount,best_seller) VALUES ( ?, ?, ?, ?, ?, ?)';
            const params1 = [name, type, sold_quantity, price, discount, best_seller];

            // thêm dữ liệu vào bảng equipment
            const [result1] = await pool.query(sql1, params1);
            const equipmentId = result1.insertId; // Lấy ID của thiết bị vừa tạo

            if (urlImage && urlImage.length > 0) {
                const sql2 = 'INSERT INTO image (equipment_id, url) VALUES ?';
                const params2 = urlImage.map((url) => [equipmentId, url]); // Chuyển đổi thành mảng các mảng con

                // thêm dữ liệu vào bảng image
                await pool.query(sql2, [params2]);
            }

            return {
                status: 200,
                message: 'Thêm thiết bị thành công',
            };
        } catch (error) {
            console.error('Database query error:', error);

            if (error.code === 'ER_DUP_ENTRY') {
                return { status: 400, message: 'Thiết bị này đã tồn tại. Vui lòng dùng tên khác.' };
            }

            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteProduct: async (id) => {
        try {
            const sql = 'DELETE FROM equipment WHERE id = ?';
            const params = [id];

            // xóa thiết bị trong bảng equipment
            await pool.query(sql, params);

            return {
                status: 200,
                message: 'Xóa thiết bị thành công',
            };
        } catch (error) {
            console.error('Database query error:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    },

    deleteRate: async (id) => {
        try {
            const sql = 'DELETE FROM evaluation WHERE id = ?';
            await pool.query(sql, [id]);
            return {
                status: 200,
                message: 'Xóa đánh giá thành công',
            };
        } catch (error) {
            console.error('Database query error:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    },
};

module.exports = adminServices;
