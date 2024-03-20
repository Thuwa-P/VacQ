const mysql = require("mysql");

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "thuwas0ftw@r3d3V",
  database: "vacCenter",
});

module.exports = connection;
