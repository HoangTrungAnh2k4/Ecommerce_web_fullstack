const express = require('express');
var cors = require('cors');

const routes = require('./src/routes/index');

const app = express();

const hostname = 'localhost';
const port = process.env.PORT;

app.use(
    cors({
        origin: process.env.CORS_FRONTEND,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
        exposedHeaders: ['Content-Length'],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello Hoang Trung Anh!');
});

routes(app);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
