var mysql = require('../../../config.db');

var modeloUsuarios = {};

modeloUsuarios.insertUser = function(usuario, callback){

    if (mysql.connection) {
        mysql.connection.query('INSERT INTO user_test SET ?', usuario, function(err, result) {
            if(err){
                throw err;
            }else{
                callback(result);
            }
        });
    }
};

modeloUsuarios.countUser = function(email,callback){

    if (mysql.connection) {
        //mysql.connection.query('INSERT INTO users SET ?', userData.user, function(error, result) {
            mysql.connection.query('SELECT COUNT(*) AS userCount FROM user_test WHERE email like "' +email + '"', function(err, rows) {
            if(err){
                throw err;
            }else{
                callback(rows);
            }
        });
    }
};

module.exports = modeloUsuarios;
