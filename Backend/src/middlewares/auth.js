const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // const whiteList = ['/auth/login', '/auth/register'];
    // console.log(req.path);
    // console.log(req.originalUrl);
    next();
    return;

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        // veryfy token
        var decoded = jwt.verify(token);

        next();
    } else {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
};

module.exports = auth;
