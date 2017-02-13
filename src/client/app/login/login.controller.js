(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /*** SignIn ***/

  LoginController.$inject = ['dataservice', '$state', '$timeout', '$uibModal', 'logger',
    '$uibModalInstance', 'cookiesService', 'headerService'
  ];

  function LoginController(dataservice, $state, $timeout, $uibModal, logger,
    $uibModalInstance, cookiesService, headerService) {
    var vm = this;

    vm.datos = {
      email: '',
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
      dataservice.localSignIn(dataUserJSON).then(function(response) {
        if (response === 'Email incorrecto') {
          logger.error(response);
        } else if (response === 'Password incorrecto') {
          logger.error(response);
        } else if (response.email === vm.datos.email) {
          console.log(response);
          $uibModalInstance.dismiss('cancel');
          cookiesService.SetCredentials(response);
          logger.success('Usuario autentificado');
          headerService.login();
          $state.go('home');

        } else {
          logger.error(response);
        }
      });
    }


  }

})();
