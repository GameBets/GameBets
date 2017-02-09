'use strict';

var express = require('express');
var router = express.Router();
var dashboardController = require('./dashboard.controller');

router.get('/people', dashboardController.getPeople);
router.get('/person/:id', dashboardController.getPerson);

module.exports = router;

//////////////
