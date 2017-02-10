'use strict';

var express = require('express');
var router = express.Router();
var loginController = require('./login.controller');

router.post('/users_signup', loginController.signup);


// route to test if the user is logged in or not
router.get('/loggedin', loginController.logger);

/*router.get('/loginTwitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('TWITTER login '+JSON.stringify(req.user));
    res.redirect('/');
  });
*/

/*app.get('/auth/facebook', loginController.facebook);


app.get('/auth/facebook/callback', loginController.facebook);*/


// route to log out
router.get('/logout', loginController.logout);

module.exports = router;
