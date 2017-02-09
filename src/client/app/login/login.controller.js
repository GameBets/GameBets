(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /*** Login ***/

  LoginController.$inject = ['dataservice', '$state', '$timeout', '$uibModal'];

  function LoginController(dataservice, $state, $timeout, $uibModal) {
    var vm = this;
    vm.inputEmail = '';
    vm.inputPass = '';
    vm.SubmitLogin = SubmitLogin;
    vm.CloseModal = CloseModal;

    function CloseModal() {
  //    $uibModal.dismiss('cancel');
    }

    function SubmitLogin() {
      //$uibModal.dismiss('cancel');
    }
  }
})();
