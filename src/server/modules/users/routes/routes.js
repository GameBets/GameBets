// 'use strict';
//
// var express = require('express');
// var router = express.Router();
// var userCtrl = require('../controller/user');
// var mainCtrl = require('../controller/main');
// // var auth = require('../middlewares/authentication');
// //
// // router.get('/users', auth.ensured, userCtrl.getAll, mainCtrl.toJSON('users'));
// // router.get('/users/:userId', auth.ensured, userCtrl.findById, mainCtrl.toJSON('user'));
// router.post('/api/users_signup', userCtrl.CreateUser, mainCtrl.toJSON('users'));
// // router.put('/users/:userId', auth.ensured, userCtrl.findById, userCtrl.update, mainCtrl.toJSON('user'));
// // router.delete('/users/:userId', auth.ensured, userCtrl.delete);
// module.exports = router;
var Controller = require ('../controller/user');
//var passport =require('./utils/passport');

//module.exports = function(app) {
   // app.post('/api/signup', Controller.signup);
//};

module.exports = function(app,passport) {
  // var passport = require('passport');
  console.log("entro1");

    app.post('/api/users_signup', passport.authenticate('local-signup',function(err, user, next) {
      console.log("entro2");
        // if (err){ return next(err);}
        // if (!user) {return next(null, false);}
        // return next(null, user);

    }));
};
