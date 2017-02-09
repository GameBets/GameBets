'use strict';

var express = require('express');
var router = express.Router();
var four0four = require('./../../utils/404')();

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////
