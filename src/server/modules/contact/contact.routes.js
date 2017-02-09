'use strict';

var express = require('express');
var router = express.Router();
var contactController = require('./contact.controller');

router.post('/sendmail', contactController.sendEmailContact);

module.exports = router;
