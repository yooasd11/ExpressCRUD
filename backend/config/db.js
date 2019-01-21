var mysql = require('mysql');
var { db } = require('./vars');
var connection = mysql.createConnection(db);

connection.connect();

exports.rawQuery = function(query, callback) {
  connection.query(query, callback);
}

exports.users = function(callback) {
  connection.query('SELECT * from user', callback);
}

exports.insertUser = function(body, callback) {
  connection.query(`INSERT INTO user (id, email, password) VALUES ("${body.id}", "${body.email}", "${body.password}");`, callback);
}

exports.deleteUser = function(id, callback) {
  connection.query(`DELETE FROM user WHERE id = ${id};`, callback);
}

exports.updateUser = function(body, callback) {
  connection.query(`UPDATE user SET id = "${body.id}", email = "${body.email}", password = "${body.password}" WHERE id = ${body.id};`, callback);
}