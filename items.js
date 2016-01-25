'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'meals'
});

connection.connect();


function addItem(attributes) {
  connection.query('INSERT INTO meals SET ?', attributes, function(err, result){
    if (err) throw err;
  });
}

function getItem()

module.exports = {
  add: addItem,
  get: getItem
};
