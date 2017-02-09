var mysql = require('./../../config/config.db');

var chatModel = {};

chatModel.insertMessage = function(data, callback) {
  if (mysql.connection) {
    var date = new Date();
    var datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    datetime += ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var sql = 'INSERT INTO messages (username, message, ip, date) VALUES';
    sql += ' ("' + data.username + '",  "' + data.message + '", "192.168.1.1", "' + datetime + '")';
    mysql.connection.query(sql, function(error, result) {
      if (error) {
          callback(true,{'msg':'error'});
      } else {
          callback(false,{'msg':'success'});
      }
    });
  }
};

chatModel.getMessages = function(callback) {
  if (mysql.connection) {
    var date = new Date();
    var sql = '(SELECT * FROM messages ORDER BY id DESC LIMIT 150) ORDER BY id ASC';
    mysql.connection.query(sql, function(error, result) {
      if (error) {
          callback(true,{'msg':'error'});
      } else {
          callback(false,{'result':result});
      }
    });
  }
};

module.exports = chatModel;
