'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'meals'
});

connection.connect();


function addItem(attributes, callback) {
  connection.query('INSERT INTO meals SET ?', attributes, function(err, result){
    if (err) throw err;
    callback(result)
  });
}

function getItem(callback) {
  connection.query('SELECT * FROM meals', function(err, result) {
    if (err) throw err;
    callback(result);
  });
}

function deleteItem(id, callback) {
  connection.query('DELETE FROM meals WHERE meal_id = ?', id, function(err, result) {
    callback(err, result);
  })
}

module.exports = {
  add: addItem,
  get: getItem,
  del: deleteItem
};
