(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', '$uibModal'];
  /* @ngInject */
  function SidebarController($state, routerHelper, $uibModal) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.showSignInModal = showSignInModal;

    activate();

    function activate() { getNavRoutes(); }

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

   function showSignInModal() {
      var modalInstance = $uibModal.open({
          animation: 'true',
          templateUrl: 'app/login/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          size: 'lg'
      });
  }

  }
})();
