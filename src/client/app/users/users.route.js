(function() {
  'use strict';

  angular
    .module('app.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signin',
        config: {
          url: '/users',
          templateUrl: 'app/users/signin.html',
          controller: 'UsersController',
          controllerAs: 'vm',
          title: 'Users',
        }
      }
    ];
  }
})();
