var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_nguytha4',
  password        : 'GkbPXFLFpTLg7Bnb',
  database        : 'cs290_nguytha4'
});

module.exports.pool = pool;
