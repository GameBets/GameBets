(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$q', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function UsersController($q, dataservice, logger, $scope) {
    var vm = this;
    // console.log("hola");
    //Variables
    vm.inputType = 'password';
    vm.inputTyp2 = 'password';
    vm.imgSrc = '../../images/view.png';
    vm.imgSrc2 = '../../images/view.png';

    //Datos del usuario
    vm.datos = {
      user: '',
      email: '',
      password: '',
      password2: ''
    };

    //Funciones
    vm.signup = signup;
    vm.checkPasswd = checkPasswd;
    vm.showHidePasswd = showHidePasswd;
    vm.showHidePasswd2 = showHidePasswd2;


    console.log(vm.datos);
    activate();

    function activate() {
      logger.info('Activated Users View');
    }


    function showHidePasswd() {
      if(vm.inputType === 'password'){
        vm.inputType = 'text';
        vm.imgSrc =  '../../images/hide.png';
      }
      else{
        vm.inputType = 'password';
        vm.imgSrc =  '../../images/view.png';
      }
    }

    function showHidePasswd2() {
      if(vm.inputType2 === 'password'){
        vm.inputType2 = 'text';
        vm.imgSrc2 =  '../../images/hide.png';
      }
      else{
        vm.inputType2 = 'password';
        vm.imgSrc2 =  '../../images/view.png';
      }
    }

    function checkPasswd() {
      if (vm.datos.password === vm.datos.password2) {
        return true;
      }
      return false;
    }


    function signup() {
      var dataUserJSON = JSON.stringify(vm.datos);
      console.log(dataUserJSON);
      console.log($scope.signupform.$valid);
      // dataservice.signup(dataUserJSON);
      // .then(function (data){
      //   console.log(data);
      // });
    }

  }
})();
