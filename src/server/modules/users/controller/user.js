var Users = require('../model/user.model.js');

exports.signup = function (req, res) {
    Users.insertUser(req.body,
            function (err, callback) {
                if (err) {
                    res.send(err);
                }
                res.json(callback); // devuelve todos los menus en JSON
            }
    );
};
