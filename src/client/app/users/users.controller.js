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
      user:'',
      // email:'',
      password:''
      // password2:''
    };
    vm.signup = signup;

    console.log(vm.datos);
    activate();

    function activate() {
      logger.info('Activated Users View');
    }

    function signup(){
      var dataUserJSON = JSON.stringify(vm.datos);
      console.log(dataUserJSON);
      dataservice.signup(dataUserJSON);
      // .then(function (data){
      //   console.log(data);
      // });
    }

  }
})();
