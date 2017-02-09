var data = require('./data');
var four0four = require('./../../utils/404')();

var dashboardController = {};

dashboardController.getPeople = function(req, res, next) {
  res.status(200).send(data.people);
};

dashboardController.getPerson = function(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function(p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
};

module.exports = dashboardController;
