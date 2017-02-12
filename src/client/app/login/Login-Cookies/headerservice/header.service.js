(function() {
  'use strict';

  angular
    .module('headerService')
    .factory('headerService', header);

  header.$inject = ['cookiesService', '$rootScope', '$state', '$uibModal'];

  /* @ngInject */
  function header(cookiesService, $rootScope, $state, $uibModal) {
    return {
      login: login,
      logout: logout,
    };

    function login() {

      var user = cookiesService.GetCredentials();
      if (user) {

        $rootScope.loginG = false;
        $rootScope.profileG = true;
        $rootScope.logoutG = true;
        $rootScope.signUpG = false;
        $rootScope.profile = user.email;
        $rootScope.generalG = true;
        $rootScope.socialNetwork = true;

        // redirect
        console.log(user);
        $state.go('home');

      } else {
        $rootScope.socialNetwork = false;
        $rootScope.loginG = true;
        $rootScope.profileG = false;
        $rootScope.signUpG = true;
        // cleaning...
        $rootScope.profile = '';
        $rootScope.logoutG = false;
        $rootScope.generalG = false;
      }
    }

    function logout() {

      cookiesService.ClearCredentials();

      $rootScope.socialNetwork = false;
      $rootScope.loginG = true;
      $rootScope.profileG = false;
      $rootScope.signUpG = true;
      // cleaning...
      $rootScope.profile = '';
      $rootScope.logoutG = false;
      $rootScope.generalG = false;
      // redirect
      $state.go('home');
    }


  }

}());
