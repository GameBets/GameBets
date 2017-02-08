'use strict';

module.exports.init = function(app) {

  var routesPath = __dirname + '/../modules/';

  app.use('/api', require(routesPath + 'chat/chat.routes'));

  app.use('/api', require(routesPath + 'dashboard/dashboard.routes'));

  app.use('/api', require(routesPath + '404/404.routes'));
};
