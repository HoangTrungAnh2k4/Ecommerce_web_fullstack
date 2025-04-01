const userRoutes = require('./userRoutes');

const routes = (app) => {
    app.use('/user/api', userRoutes);
};

module.exports = routes;
