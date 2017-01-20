(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    
  }
})();
