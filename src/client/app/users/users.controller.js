(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$q', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function UsersController($q, dataservice, logger, $scope) {
    var vm = this;
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
      if (vm.inputType === 'password') {
        vm.inputType = 'text';
        vm.imgSrc = '../../images/hide.png';
      } else {
        vm.inputType = 'password';
        vm.imgSrc = '../../images/view.png';
      }
    }

    function showHidePasswd2() {
      if (vm.inputType2 === 'password') {
        vm.inputType2 = 'text';
        vm.imgSrc2 = '../../images/hide.png';
      } else {
        vm.inputType2 = 'password';
        vm.imgSrc2 = '../../images/view.png';
      }
    }

    function checkPasswd() {
      if (vm.datos.password === vm.datos.password2) {
        return true;
      }
      return false;
    }

    //Funciones de animacion jquery
    $('.home-form').find('input, textarea').on('keyup blur focus', function(e) {

      var $this = $(this),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
          label.show();
        } else {
          label.hide();
        }
      } else if (e.type === 'blur') {
        if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.removeClass('highlight');
        }
      } else if (e.type === 'focus') {

        if ($this.val() === '') {
          label.removeClass('highlight');
        } else if ($this.val() !== '') {
          label.addClass('highlight');
        }
      }

    });

    $('.tab a').on('click', function(e) {

      e.preventDefault();

      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');

      target = $(this).attr('href');

      $('.tab-content > div').not(target).hide();

      $(target).hide();
    });
    //fin

    function signup() {
      var dataUserJSON = JSON.stringify(vm.datos);
      console.log(dataUserJSON);
      console.log($scope.signupform.$valid);
      dataservice.signup(dataUserJSON);
      // .then(function (data){
      //   console.log(data);
      // });
    }

  }
})();
