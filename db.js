var mysql = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();

exports.rawQuery = function(query, callback) {
  connection.query(query, callback);
}

exports.users = function(callback) {
  connection.query('SELECT * from user', callback);
}

exports.insertUser = function(body, callback) {
  connection.query(`INSERT INTO user (name, email, password) VALUES ("${body.name}", "${body.email}", "${body.password}");`, callback);
}

exports.deleteUser = function(id, callback) {
  connection.query(`DELETE FROM user WHERE id = ${id};`, callback);
}

exports.updateUser = function(body, callback) {
  connection.query(`UPDATE user SET name = "${body.name}", email = "${body.email}", password = "${body.password}" WHERE id = ${body.id};`, callback);
}