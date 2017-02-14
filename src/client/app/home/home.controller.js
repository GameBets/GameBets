(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$q', 'dataservice', 'logger', '$scope' , '$translate'];
  /* @ngInject */
  function HomeController($q, dataservice, logger, $scope, $translate) {
    var vm = this;
    activate();

    changeLanguage();

    function changeLanguage() {
      console.log("EEESESE")
      $scope.changeLanguage = function(key) {
        $translate.use(key);
      }
    }
    function activate() {
      logger.info('Activated Home View');

    }

  }
})();
