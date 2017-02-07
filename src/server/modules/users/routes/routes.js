var Controller = require ('../controller/user');
var passport = require('passport');

module.exports = function (app) {
    app.post('/api/users_signup', Controller.signup);
    // app.post('/api/localSignin', Controller.localSignin);
};
