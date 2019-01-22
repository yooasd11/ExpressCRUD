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

exports.insertUser = function(user, callback) {
  connection.query(`INSERT INTO user (id, email, password) VALUES ("${user.id}", "${user.email}", "${user.password}");`, callback);
}

exports.deleteUser = function(id, callback) {
  connection.query(`DELETE FROM user WHERE id = ${id};`, callback);
}

exports.updateUser = function(user, callback) {
  connection.query(`UPDATE user SET id = "${user.id}", email = "${user.email}", password = "${user.password}" WHERE id = ${user.id};`, callback);
}

exports.selectUser = function(user, callback) {
  connection.query(`SELECT * FROM user WHERE id = "${user.id}" AND password = "${user.password}"`, callback);
}