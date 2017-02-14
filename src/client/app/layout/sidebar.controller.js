(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state','$scope', '$translate','routerHelper', '$uibModal', 'headerService'];
  /* @ngInject */
  function SidebarController($state, $scope, $translate, routerHelper, $uibModal, headerService) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.showSignInModal = showSignInModal;
    vm.logout = logout;
  //  vm.changeLanguage = changeLanguage;
    activate();
    changeLanguage();



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


    function changeLanguage() {
      $scope.changeLanguage = function(key) {
        $translate.use(key);
      }
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
