
var mysql = require('mysql');

//call env config file
require('dotenv').config();


//config connection
var connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DATABASE

});

connection.connect(function (err){
    if(err){
        connection.end();
        console.log(err);
        return;
    }else {
        console.log('Database Connected='+process.env.DATABASE);
    }
});

module.exports = connection;