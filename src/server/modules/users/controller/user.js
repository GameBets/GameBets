var passport = require('passport');

exports.signup = function (req, res, next) {
  // console.log(req.body);
  // console.log('entra al signup');
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('Usuario ya existe');
        }
        return res.send(true);

    })(req, res, next);

};
