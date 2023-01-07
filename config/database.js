const mysql = require('mysql');

//create connection expressJS with mysql database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true
});

//testing connection succses or not
conn.connect((err) => {
    if (err) throw err;
    console.log('MySql Connected ....');
})


module.exports = conn;