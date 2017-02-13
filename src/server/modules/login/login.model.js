var mysql = require('./../../config/config.db');

var modeloUsuarios = {};

modeloUsuarios.insertUser = function(usuario, callback) {
  if (mysql.connection) {
    mysql.connection.query('INSERT INTO user_test SET ?', usuario, function(err, result) {
      if (err) {
        throw err;
      } else {
        callback(result);
      }
    });
  }
};

modeloUsuarios.countUser = function(email, callback) {

  if (mysql.connection) {
    var sql = 'SELECT COUNT(*) AS userCount FROM user_test WHERE email like "' + email + '"';
    mysql.connection.query(sql, function(err, rows) {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }
};

modeloUsuarios.countUserSocial = function(user, callback) {

  if (mysql.connection) {
    var sql = 'SELECT COUNT(*) AS userCount FROM user_test WHERE username like "' + user + '"';
    mysql.connection.query(sql, function(err, rows) {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }
};

modeloUsuarios.getUser = function(user, callback) {
  if (mysql.connection) {
    mysql.connection.query('SELECT * FROM user_test WHERE username like "' + user + '"',
      function(error, rows) {
        if (error) {
          throw error;
        } else {
          callback(null, rows);
        }
      });
  }
};

modeloUsuarios.getUserByEmail = function(email, callback) {
  if (mysql.connection) {
    mysql.connection.query('SELECT * FROM user_test WHERE email like "' + email + '"',
      function(error, rows) {
        if (error) {
          throw error;
        } else {
          callback(null, rows);
        }
      });
  }
};

module.exports = modeloUsuarios;
