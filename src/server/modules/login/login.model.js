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
    //mysql.connection.query('INSERT INTO users SET ?', userData.user, function(error, result) {
    mysql.connection.query('SELECT COUNT(*) AS userCount FROM user_test WHERE email like "' + email + '"', function(err, rows) {
      if (err) {
        throw err;
      } else {
        callback(rows);
      }
    });
  }
};

modeloUsuarios.countUser_Social = function(user, callback) {

  if (mysql.connection) {
    //mysql.connection.query('INSERT INTO users SET ?', userData.user, function(error, result) {
    mysql.connection.query('SELECT COUNT(*) AS userCount FROM user_test WHERE username like "' + user + '"', function(err, rows) {
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
