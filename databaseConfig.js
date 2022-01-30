const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "team_finder",
});

connection.connect((err) => {
    if (err) { throw err; };
    console.log("Connected from databaseConfig.js!");
});

module.exports = {
    connection: connection,
};