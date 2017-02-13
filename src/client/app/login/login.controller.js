(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /*** Login ***/

  LoginController.$inject = ['dataservice', '$state', '$timeout', '$uibModal'];

  function LoginController(dataservice, $state, $timeout, $uibModal) {
    var vm = this;

    vm.datos= {
      email:'',
      passwd: ''
    };

    vm.SubmitLogin = SubmitLogin;
    vm.CloseModal = CloseModal;

    function CloseModal() {
      //    $uibModal.dismiss('cancel');
    }

    function SubmitLogin() {
      var dataUserJSON = JSON.stringify(vm.datos);
      console.log(dataUserJSON);
      // dataservice.signup(dataUserJSON).
      //$uibModal.dismiss('cancel');
    }


  }
})();
