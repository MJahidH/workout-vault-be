const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

//  const mySqlLink = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDB}`;

const pool = mysql.createPool({

    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,

})

// const pool = mysql.createPool(process.env.MYSQL_URL);

module.exports = pool;
