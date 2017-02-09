(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$q', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function HomeController($q, dataservice, logger, $scope) {
    var vm = this;
  
    activate();

    function activate() {
      logger.info('Activated Home View');

    }

  }
})();
