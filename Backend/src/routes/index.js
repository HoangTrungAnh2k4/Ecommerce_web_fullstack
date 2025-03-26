const userRoutes = require('./userRoutes');

const routes = (app) => {
    app.use('/user', userRoutes);
};

module.exports = routes;
