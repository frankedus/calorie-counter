'use strict';

var fs = require('fs')

fs.readFile('package.json', 'utf-8', function(error, data) {
  console.log(data);
})
