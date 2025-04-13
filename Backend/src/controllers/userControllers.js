const userService = require('../services/userServices');

const userControllers = {
    Type: ['pc', 'laptop', 'monitor', 'ssd', 'cpu', 'gpu', 'mainboard'],

    test: async (req, res) => {
        try {
            const result = await userService.test();
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    getListEquipmentByType: async (req, res) => {
        try {
            const { type } = req.query;

            if (!type || !userControllers.Type.includes(type)) {
                return res.status(400).json({ error: 'Invalid type parameter' });
            }

            const result = await userService.getListEquipmentByType(type);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    getListBestSeller: async (req, res) => {
        try {
            const { type } = req.query;

            if (!type || !userControllers.Type.includes(type)) {
                return res.status(400).json({ error: 'Invalid type parameter' });
            }

            const result = await userService.getListBestSeller(type);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    getUserInfor: async (req, res) => {
        console.log(req.user);

        try {
            res.status(200).json(req.user);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    postRate: async (req, res) => {
        try {
            const { value, comment, equipment_id } = req.body;
            const user = {
                id: req.user.userInfor.id,
                name: req.user.userInfor.name,
            };
            const rate = {
                value: parseInt(value),
                comment: comment,
                equipment_id: parseInt(equipment_id),
            };

            const result = await userService.postRate(user, rate);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },

    getRate: async (req, res) => {
        console.log('getRate');

        try {
            const { id } = req.params;
            console.log(id);

            if (!id) return res.status(400).json({ error: 'Invalid id parameter' });

            const result = await userService.getRate(id);
            res.status(result.status).json(result.message ? { message: result.message } : result.data);
        } catch (err) {
            res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
        }
    },
};

module.exports = userControllers;
