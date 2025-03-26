const userServices = require('../services/userServices');

const userControllers = {
    test: async (req, res) => {
        try {
            const response = await userServices.test();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send;
        }
    },
};

module.exports = userControllers;
