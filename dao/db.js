var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'library.cpwlhx0xoabz.us-east-2.rds.amazonaws.com',
    user     : 'hayu4998',
    password : 'yuanhao_0718',
    port : 3306,
    database : 'lms'
});

module.exports = connection;