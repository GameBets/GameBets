var mysql = require('mysql');
  exports.connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'daniel',
      password: 'daniel',
      database: 'GameBets_DB'
  });
