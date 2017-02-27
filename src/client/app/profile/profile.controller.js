(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', '$scope', '$translate', '$translatePartialLoader'];
  /* @ngInject */
  function ProfileController(logger, $scope, $translate, $translatePartialLoader) {
    var vm = this;
    vm.title = 'Profile';
    $translatePartialLoader.addPart('profile');
    activate();

    function activate() {
      logger.info('Activated Profile View');
    }
  }
})();
