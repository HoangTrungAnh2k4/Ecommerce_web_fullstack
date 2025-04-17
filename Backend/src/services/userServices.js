const pool = require('../config/db');
const { login } = require('./authServices');

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
                    best_seller: equipment.best_seller || false,
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
                    best_seller: equipment.best_seller || false,
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
                return { status: 404, message: 'Rate not found' };
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

    getEquipmentDetail: async (id) => {
        try {
            const sql = `SELECT * FROM equipment WHERE id = ?`;
            const params = [id];
            const [results] = await pool.query(sql, params);

            if (results.length === 0) {
                return { status: 404, message: 'Equipment not found' };
            }

            return { status: 200, data: results[0] };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    addToCart: async (userId, equipment) => {
        try {
            const sql1 = `select id from cart where user_id = ?`;
            const params1 = [userId];
            const [results1] = await pool.query(sql1, params1);

            let cartId = null;

            if (results1.length === 0) {
                const sql2 = `insert into cart (user_id) values (?)`;
                const params2 = [userId];
                const [results2] = await pool.query(sql2, params2);

                if (results2.affectedRows === 0) {
                    return { status: 404, message: 'User not found' };
                }

                cartId = results2.insertId;
            }

            // thêm thiết bị vào bảng cart_item

            const sql4 = `insert into cart_item (cart_id, equipment_id, quantity) values (?, ?, ?)`;
            const params4 = [cartId || results1[0].id, equipment.id, equipment.quantity];
            const [results4] = await pool.query(sql4, params4);

            if (results4.affectedRows === 0) {
                return { status: 404, message: 'Equipment not found' };
            }

            return { status: 200, message: 'Add to cart successfully' };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else if (error.code === 'ER_DUP_ENTRY') {
                return { status: 409, message: 'Duplicate entry' };
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    getCart: async (userId) => {
        try {
            const sql1 = `select id from cart where user_id = ?`;
            const params1 = [userId];
            const [results1] = await pool.query(sql1, params1);

            if (results1.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }

            const sql2 = `select * from cart_item where cart_id = ?`;
            const params2 = [results1[0].id];
            const [results2] = await pool.query(sql2, params2);

            if (results2.length === 0) {
                return { status: 404, message: 'Cart item not found' };
            }

            return { status: 200, data: results2 };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    deleteItemCart: async (userId, equipmentId) => {
        try {
            const sql1 = `select id from cart where user_id = ?`;
            const params1 = [userId];
            const [results1] = await pool.query(sql1, params1);

            if (results1.length === 0) {
                return { status: 404, message: 'Cart not found' };
            }

            const sql2 = `delete from cart_item where cart_id = ? and equipment_id = ?`;
            const params2 = [results1[0].id, equipmentId];
            const [results2] = await pool.query(sql2, params2);

            if (results2.affectedRows === 0) {
                return { status: 404, message: 'Equipment not found in cart' };
            }

            return { status: 200, message: 'Delete item successfully' };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else if (error.code === 'ER_DUP_ENTRY') {
                return { status: 409, message: 'Duplicate entry' };
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    addNewOrder: async (userId, listEquipmentId) => {
        try {
            const sql = `insert into order_common (user_id) values (?)`;
            const params = [userId];
            const [results] = await pool.query(sql, params);

            if (results.affectedRows === 0) {
                return { status: 404, message: 'User not found' };
            }

            const orderId = results.insertId;

            const sql2 = `insert into order_detail (order_id, equipment_id, quantity) values ?`;
            const params2 = listEquipmentId.map((equipment) => [orderId, equipment.id, equipment.quantity]);
            const [results2] = await pool.query(sql2, [params2]);

            if (results2.affectedRows === 0) {
                return { status: 404, message: 'Equipment not found' };
            }

            return { status: 200, message: 'Add new order successfully' };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else if (error.code === 'ER_DUP_ENTRY') {
                return { status: 409, message: 'Duplicate entry' };
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },

    getOrder: async (userId) => {
        try {
            const sql = `
                        SELECT od.*, oc.date
                        FROM order_detail od
                        JOIN order_common oc ON od.order_id = oc.order_id
                        WHERE oc.user_id = ?
                        ORDER BY od.order_id DESC
                        `;

            const [results2] = await pool.query(sql, [userId]);

            if (results2.length === 0) {
                return { status: 404, message: 'Order detail not found' };
            }
            return { status: 200, data: results2 };
        } catch (error) {
            console.error('Error:', error);
            if (error.code === 'ER_NO_SUCH_TABLE') {
                throw new Error('TABLE_NOT_FOUND');
            } else if (error.code === 'ER_DUP_ENTRY') {
                return { status: 409, message: 'Duplicate entry' };
            } else {
                throw new Error('DATABASE_ERROR');
            }
        }
    },
};

module.exports = userService;
