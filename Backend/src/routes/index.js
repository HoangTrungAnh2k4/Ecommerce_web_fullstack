const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

const auth = require('../middlewares/auth');

const routes = (app) => {
    app.use('/auth/api', authRoutes);
    app.use('/user/api', auth, userRoutes);
};

module.exports = routes;
