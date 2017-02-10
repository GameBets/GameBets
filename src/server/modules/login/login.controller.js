var passport = require('passport');
var LoginController = {};

LoginController.signup = function(req, res, next) {
  // console.log(req.body);
  // console.log('entra al signup');
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return res.send('err');
    }
    if (!user) {
      return res.send('Usuario ya existe');
    }
    return res.send(true);

  })(req, res, next);

};




LoginController.facebook = function (req, res, next) {

    passport.authenticate('facebook', function (err, user, info) {

        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('errorcredentials');
        }
        //return res.send(user);
        res.redirect('/');
    })(req, res, next);

};





// authenticate logger
LoginController.logger = function(req, res) {
  console.log('Logged in EXPRESS' + JSON.stringify(req.user));
  res.send(req.isAuthenticated() ? req.user : '0');
};




// logout
LoginController.logout = function(req, res) {
  req.logOut();
  res.redirect('/');
  //res.send(200);
};

module.exports = LoginController;
