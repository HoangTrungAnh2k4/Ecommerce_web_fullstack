// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ecommerce_web',
    password: '123456',
});

module.exports = connection;
