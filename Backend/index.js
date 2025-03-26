const express = require('express');

const routes = require('./src/routes/index');

const app = express();

const hostname = 'localhost';
const port = 3000;

app.use(express.json());

routes(app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
