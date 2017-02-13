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

LoginController.signin = function(req, res, next) {
  console.log(req.body);
  console.log('entra al signin');
  // passport.authenticate('local-signup', function(err, user, info) {
  //   if (err) {
  //     return res.send('err');
  //   }
  //   if (!user) {
  //     return res.send('Usuario ya existe');
  //   }
  //   return res.send(true);
  //
  // })(req, res, next);

};




LoginController.facebook = function(req, res, next) {

  passport.authenticate('facebook', {
    scope: 'email'

  });

};

LoginController.facebookCallback = function(req, res, next) {

  passport.authenticate('facebook', {
    successRedirect: '/socialsignin',
    failureRedirect: 'home'
  });


}


LoginController.twitter = function(req, res, next) {

  passport.authenticate('twitter');

};

LoginController.twitterCallback = function(req, res, next) {

  passport.authenticate('twitter', {
    successRedirect: '/socialsignin',
    failureRedirect: 'home'

  });

};


// authenticate logger
LoginController.logger = function(req, res) {
  console.log('Logged in EXPRESS' + JSON.stringify(req.user));
  res.send(req.isAuthenticated() ? req.user : '0');
};

LoginController.auth = function(req, res) {
  // console.log(req.user);
  res.json(req.user);
}



// logout
LoginController.logout = function(req, res) {
  req.logOut();
  res.redirect('/');
  //res.send(200);
};

module.exports = LoginController;
