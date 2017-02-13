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
        $rootScope.ProfilePersonal = true;
        $rootScope.loginG = false;
        $rootScope.profileG = true;
        $rootScope.logoutG = true;
        $rootScope.signUpG = false;
        $rootScope.profile = user.email;
        $rootScope.user = user.user;
        $rootScope.generalG = true;
        $rootScope.socialNetwork = true;
        $rootScope.picture = user.picture;

        // redirect
        console.log(user);
        $state.go('home');

      } else {
        $rootScope.socialNetwork = false;
        $rootScope.loginG = true;
        $rootScope.profileG = false;
        $rootScope.ProfilePersonal = false;
        $rootScope.signUpG = true;
        // cleaning...
        $rootScope.profile = '';
        $rootScope.user = '';
        $rootScope.logoutG = false;
        $rootScope.generalG = false;
        $rootScope.picture = '';
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
      $rootScope.user = '';
      $rootScope.picture = '';
      $rootScope.ProfilePersonal = false;
      $rootScope.logoutG = false;
      $rootScope.generalG = false;
      // redirect
      $state.go('home');
    }


  }

}());
