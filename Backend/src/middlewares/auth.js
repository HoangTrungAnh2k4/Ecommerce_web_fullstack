const jwt = require('jsonwebtoken');
require('dotenv');

const auth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        try {
            // veryfy token
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = { phoneNumber: decode.phoneNumber, userInfor: decode.userInfor };

            next();
        } catch (error) {
            console.log(error);

            return res.status(401).json({ message: 'Access_token is expired or invalid' });
        }
    } else {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
};

module.exports = auth;
