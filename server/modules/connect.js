var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yx110120',
    database: 'article'
})

connection.connect();

module.exports = connection;