(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state','$scope', '$translate', '$translatePartialLoader',
  'routerHelper', '$uibModal', 'headerService'];
  /* @ngInject */
  function SidebarController($state, $scope, $translate, $translatePartialLoader,
    routerHelper, $uibModal, headerService) {
    var vm = this;
     $translatePartialLoader.addPart('layout');
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.showSignInModal = showSignInModal;
    vm.logout = logout;
    vm.setLang = setLang;
  //  vm.changeLanguage = changeLanguage;
    activate();

    function activate() {
      getNavRoutes();
      headerService.login();
    }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }

    function setLang(langKey) {
         // You can change the language during runtime
         console.log('Language set to ' + langKey);
         $translate.use(langKey);
       }

    function showSignInModal() {
      var modalInstance = $uibModal.open({
        animation: 'true',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        size: 'lg'
      });
    }

    function logout() {
        headerService.logout();
    }

  }
})();
