'use strict';

var express = require('express');
var router = express.Router();
var loginController = require ('./login.controller');

router.post('/users_signup', loginController.signup);

module.exports = router;
