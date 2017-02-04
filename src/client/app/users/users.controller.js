(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function UsersController($q, dataservice, logger) {
    var vm = this;
    console.log("hola");
    vm.datos = {
      username:'',
      email:'',
      password:'',
      password2:''
    };
    vm.signup = signup;

    console.log(vm.datos);
    activate();

    function activate() {
      logger.info('Activated Users View');
    }

    function signup(){

      console.log(vm.datos);
      console.log("hola");
      dataservice.signup(vm.datos);
      // .then(function (data){
      //   console.log(data);
      // });
    }

  }
})();
