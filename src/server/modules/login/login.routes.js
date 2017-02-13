'use strict';

var express = require('express');
var router = express.Router();
var loginController = require('./login.controller');

router.post('/users_signup', loginController.signup);

router.get('/users_signin', loginController.signin);


router.get('/auth/facebook', loginController.facebook);

router.get('/auth/facebook/callback', loginController.facebookCallback);

router.get('/auth/twitter', loginController.twitter);
router.get('/auth/twitter/callback', loginController.twitterCallback);

//retorno del cliente para recoger los datos
router.get('/auth/success', loginController.auth);
// route to log out
router.get('/logout', loginController.logout);

module.exports = router;
