'use strict';

module.exports.init = function(app) {
  var routesPath = __dirname + '/../modules/';
  app.use('/', require(routesPath + 'users/routes/routes'));
  // app.use('/auth', require(routesPath + '/authentication'));
  // app.use('/', require(routesPath + '/account'));
  // app.use('/', require(routesPath + '/users'));
};
