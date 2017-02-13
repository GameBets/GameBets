(function() {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  appRun.$inject = ['routerHelper','dataservice'];
  /* @ngInject */
  function appRun(routerHelper,dataservice) {
    routerHelper.configureStates(getStates(dataservice));
  }

  function getStates(dataservice) {
    return [
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Profile',
        }
      }
    ];
  }
})();
