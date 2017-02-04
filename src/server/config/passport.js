var LocalStrategy = require('passport-local').Strategy;
//var Users = require('./users.model.js');
var bcrypt = require('bcrypt-nodejs');
var mysql = require('../config.db');


//exportamos lalibreria de funciones
module.exports = function(passport) {
  console.log("dentro de passport");

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  //En una aplicación web típica, las credenciales utilizadas para autenticar un
  //usuario sólo se transmitirán durante la solicitud de inicio de sesión. Si la
  //autenticación tiene éxito, se establecerá y mantendrá una sesión a través de
  //una cookie establecida en el navegador del usuario.

  //Cada solicitud posterior no contendrá credenciales, sino la cookie única que
  //identifica la sesión. Para dar soporte a las sesiones de inicio de sesión,
  //Passport serializará y deserializará las instancias de usuario de la sesión.

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    mysql.connection.query('SELECT * FROM user_test WHERE id =' + id, function(err, rows) {
      done(err, rows[0]);
    });
  });

  //En este ejemplo, sólo el ID de usuario se serializa en la sesión, manteniendo
  //pequeña la cantidad de datos almacenados dentro de la sesión. Cuando se reciben
  //solicitudes posteriores, este ID se utiliza para encontrar al usuario, que se
  //restaurará a req.user.

  // La lógica de serialización y deserialización es suministrada por la aplicación,
  // permitiendo a la aplicación elegir una base de datos apropiada y / o un asignador
  //de objetos, sin imposición por la capa de autenticación.

  passport.use(
    'local-signup',
    new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        console.log("dentro de passport");
        // we are checking to see if the user trying to login already exists
        mysql.connection.query('SELECT COUNT(*) AS userCount FROM user_test WHERE email like "' + user + '"',
          function(error, rows) {
            if (error) {
              return done(error);
            }
            if (rows[0].userCount >= 1) {
              console.log('existe y no lo inserto');
              return done(null, false, 'el nombre de usuario ya existe');
            } else {
              // if there is no user with that username
              // create the user
              var newUser = {
                user: username,
                email: req.body.email,
                password: bcrypt.hashSync(password, null, null)
              };
              console.log('no existe y lo inserto');
              mysql.connection.query('INSERT INTO user_test SET ?', newUser, function(error, res) {
                if (error) {
                  return done(error);
                }
                return done(null, res);
              });
            }
          });
      })
  );
};
