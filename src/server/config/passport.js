var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var modeloUsuarios = require('./../modules/login/login.model');
var passport = require('passport');
var confAuth = require('./auth'); // use this one for testing
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

//exportamos lalibreria de funciones
module.exports = function(passport) {
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
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  /*
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log('uso deserialize'); //no borrar
    mysql.connection.query('SELECT * FROM user_test WHERE id =' + id, function(err, rows) {
      done(err, rows[0]);
    });
  });*/

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
        usernameField: 'user',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        console.log('dentro de passport');
        console.log(username);
        console.log(password);
        console.log(req.body.user);

        modeloUsuarios.countUser(req.body.email, function(rows) {
          if (rows[0].userCount >= 1) {
            return done(null, false, 'el nombre de usuario ya existe');
          } else {
            // if there is no user with that username
            // create the user
            var newUser = {
              username: username,
              passwd: bcrypt.hashSync(password, null, null),
              email: req.body.email
            };

            modeloUsuarios.insertUser(newUser, function(rows) {
              if (rows) {
                return done(null, username);
              }
            }); //fin de consulta
          } //fin del else
        }); //fin de count
      })); //fin de local   )


  /////////////////////// FacebookStrategy

  passport.use(new FacebookStrategy({
      clientID: confAuth.facebookAuth.clientID,
      clientSecret: confAuth.facebookAuth.clientSecret,
      callbackURL: confAuth.facebookAuth.callbackURL,
      profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'picture'],
      passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {

      modeloUsuarios.countUser_Social(profile.id, function(rows) {
        console.log(profile);
        console.log("eee");
        if (rows[0].userCount === 0) {
          console.log(profile);
          console.log('no existe e inserto');
          var newUser = {
            username: profile.id,
            email: profile._json.email,
            displayName: profile.name.givenName,
            usertype: 'client',
            passwd: '',
            picture: profile._json.picture.data.url
          };

          modeloUsuarios.insertUser(newUser, function(rows) {
            if (rows) {
              return done(null, rows);
            }
          }); //fin de consulta
          return done(null, rows);
        } else {
          console.log('existe y devuelvo datos');
          modeloUsuarios.getUser(profile.id, function(error, rows) {
            if (!rows.length) {

              return done(null, false, 'nouser');

            } else {
              console.log(rows[0]);

              return done(null, rows[0]);
            }
          });

        } //fin del else
      }); //fin de count
    }));


  passport.use(new TwitterStrategy({
      consumerKey: confAuth.twitterAuth.consumerKey,
      consumerSecret: confAuth.twitterAuth.consumerSecret,
      callbackURL: confAuth.twitterAuth.callbackURL,
      passReqToCallback: true
    },

    function(req, token, tokenSecret, profile, done) {

      modeloUsuarios.countUser_Social(profile.id, function(rows) {
        if (rows[0].userCount === 0) {
          console.log('no existe e inserto twitter');
          var newUser = {
            username: profile.id,
            email: 'default',
            usertype: 'client',
            displayName: profile.displayName,
            passwd: '',
            picture: profile._json.profile_image_url
          };

          console.log(newUser);
          modeloUsuarios.insertUser(newUser, function(rows) {
            if (rows) {
              return done(null, newUser);
            }
          }); //fin de consulta
          //return done(null, rows);
        } else {
          console.log('si existe y devuelvo datos twitter');
          modeloUsuarios.getUser(profile.id, function(error, rows) {
            if (!rows.length) {

              return done(null, false, 'nouser');

            } else {

              return done(null, rows[0]);
            }
          });

        } //fin del else
      });
    }));

  passport.use(new GoogleStrategy({
      clientID: confAuth.googleAuth.GOOGLE_ID,
      clientSecret: confAuth.googleAuth.GOOGLE_SECRET,
      callbackURL: confAuth.googleAuth.callbackURL,
      passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, token, refreshToken, profile, done) {
      modeloUsuarios.countUser_Social(profile.id, function(rows) {
        console.log(profile);
        if (rows[0].userCount === 0) {
          //console.log(profile);
          console.log('no existe e inserto google');
          var newUser = {
            username: profile.id,
            displayName: profile.displayName,
            email: 'default',
            usertype: 'client',
            passwd: '',
            picture: profile._json.image.url
          };

          modeloUsuarios.insertUser(newUser, function(rows) {
            if (rows) {

              return done(null, newUser);
            }
          }); //fin de consulta
          //return done(null, rows);
        } else {
          console.log('si existe y devuelvo datos google');
          modeloUsuarios.getUser(profile.id, function(error, rows) {
            if (!rows.length) {

              return done(null, false, 'nouser');

            } else {

              return done(null, rows[0]);
            }
          });

        } //fin del else
      });
    }));
};
