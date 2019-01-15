var mysql = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();

exports.rawQuery = function(query, callback) {
  connection.query(query, callback);
}

exports.persons = function(callback) {
  connection.query('SELECT * from Persons', callback);
}

exports.insertPerson = function(body, callback) {
  connection.query(`INSERT INTO Persons (id, name, age) VALUES (${body.id}, "${body.name}", ${body.age});`, callback);
}

exports.deletePerson = function(id, callback) {
  connection.query(`DELETE FROM Persons WHERE id = ${id};`, callback);
}

exports.updatePerson = function(body, callback) {
  connection.query(`UPDATE Persons SET name = "${body.name}", age = ${body.age} WHERE id = ${body.id};`, callback);
}