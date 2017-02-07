(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['logger'];

  function DashboardController(logger) {
    var vm = this;
    vm.title = 'Home';

    activate();

    function activate() {
      logger.info('Activated Dashboard View');
    }
  }
})();
