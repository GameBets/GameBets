var mysql = require('mysql');
// console.log("holaaa");
  exports.connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'daniel',
      password: '',
      database: 'GameBets_DB'
  });
