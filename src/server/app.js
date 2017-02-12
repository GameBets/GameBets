'use strict';

var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('./config/routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport'); //////////
var session = require('express-session');

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());//esto se debe poner sino da fallo conect.sid
app.use(cors());

require('./config/passport.js')(passport);

config.init(app);

/* required for passport */
app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  resave: false,
  saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/socialsignin',
  failureRedirect: '/social/failure'
}));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/socialsignin',
  failureRedirect: '/social/failure'
}));

app.get('/auth/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/socialsignin',
  failureRedirect: '/social/failure'
}));

app.get('/auth/success', function(req, res) {

  res.json(req.user);

});
app.get('/social/failure', function(req, res) {
  console.log('fail');
  res.render('after-auth', {
    state: 'failure',
    user: null
  });
});


console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});

http.listen(8081, function() {
  console.log('Listening on 8081');
});
