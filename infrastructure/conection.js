const mysql = require('mysql2');

const conection = mysql.createConnection({

   host:'localhost',
   port: 3306,
   use: 'root',
   password :'root',
   database: 'agenda-petshop'

});

module.exports = conection;