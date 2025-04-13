const pool = require('../config/db');

const userService = {
    test: async () => {
        try {
            const [results] = await pool.query("SELECT * FROM equipment WHERE type = 'ssd'");

            if (results.length === 0) {
                return { status: 404, message: 'Data not found' };
            }

            return { status: 200, data: results };
        } catch (err) {
            console.error('Error:', err);
            if (err.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    getListEquipmentByType: async (type) => {
        try {
            const sql = `SELECT * FROM equipment WHERE equipment.type = ? ORDER BY equipment.sold_quantity`;
            const [equipmentInfor] = await pool.query(sql, [type]);

            if (equipmentInfor.length === 0) {
                return { status: 404, message: 'Data not found' };
            }

            const sql2 = `select equipment_id, url from image where equipment_id in (select id from equipment where type = ?)`;
            const [imageInfor] = await pool.query(sql2, [type]);

            const result = equipmentInfor.map((equipment) => {
                const images = imageInfor
                    .filter((image) => image.equipment_id === equipment.id)
                    .map((image) => image.url);
                return {
                    id: equipment.id,
                    name: equipment.name,
                    price: equipment.price,
                    sold_quantity: equipment.sold_quantity,
                    type: equipment.type,
                    bestSeller: equipment.best_seller || null,
                    discount: equipment.discount,
                    images: images.length > 0 ? images : null,
                };
            });

            return { status: 200, data: result };
        } catch (err) {
            console.error('Error:', err);
            if (err.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    getListBestSeller: async (type) => {
        try {
            const sql = `SELECT * FROM equipment WHERE type = ? AND best_seller = 1 ORDER BY sold_quantity limit 5`;
            const [equipmentInfor] = await pool.query(sql, [type]);

            if (equipmentInfor.length === 0) {
                return { status: 404, message: 'Data not found' };
            }

            const sql2 = `select equipment_id, url from image where equipment_id in (select id from equipment where type = ? and best_seller = 1)`;
            const [imageInfor] = await pool.query(sql2, [type]);

            const result = equipmentInfor.map((equipment) => {
                const images = imageInfor
                    .filter((image) => image.equipment_id === equipment.id)
                    .map((image) => image.url);
                return {
                    id: equipment.id,
                    name: equipment.name,
                    price: equipment.price,
                    sold_quantity: equipment.sold_quantity,
                    type: equipment.type,
                    bestSeller: equipment.best_seller || null,
                    discount: equipment.discount,
                    images: images.length > 0 ? images : null,
                };
            });

            return { status: 200, data: result };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    postRate: async (user, rate) => {
        try {
            const sql = `insert into evaluation (value, comment, user_id, user_name, equipment_id) values (?, ?, ?, ?, ?)`;
            const params = [rate.value, rate.comment, user.id, user.name, rate.equipment_id];
            const [results] = await pool.query(sql, params);

            if (results.affectedRows === 0) {
                return { status: 404, message: 'Equipment not found' };
            }

            return { status: 200, message: 'Rate  successfully' };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    getRate: async (id) => {
        try {
            const sql = `select * from evaluation where equipment_id = ?`;
            const params = [id];
            const [results] = await pool.query(sql, params);
            if (results.length === 0) {
                return { status: 200, message: 'Rate not found' };
            }

            return { status: 200, data: results };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },
};

module.exports = userService;
