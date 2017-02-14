(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', '$scope', '$translate'];
  /* @ngInject */
  function ProfileController(logger, $scope, $translate) {
    var vm = this;
    vm.title = 'Profile';

    activate();
    changeLanguage();

    function changeLanguage() {
      $scope.changeLanguage = function(key) {
        $translate.use(key);
      }
    }

    function activate() {
      logger.info('Activated Profile View');
    }
  }
})();
