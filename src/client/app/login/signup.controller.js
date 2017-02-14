(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['dataservice', 'logger',  '$scope', '$translate', '$state',
    'cookiesService', 'headerService'
  ];
  /* @ngInject */
  function SignUpController(dataservice, logger, $scope, $translate, $state, cookiesService, headerService) {
    var vm = this;
    //Variables
    vm.inputType = 'password';
    vm.inputType2 = 'password';
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
    vm.limpiarCampos = limpiarCampos;

    // activate();
    //
    // function activate() {
    //   logger.info('Activated Users View');
    // }

    changeLanguage();

    function changeLanguage() {
      console.log("EEESESE")
      $scope.changeLanguage = function(key) {
        $translate.use(key);
      }
    }

    function limpiarCampos() {
      vm.datos.user = '';
      vm.datos.email = '';
      vm.datos.password = '';
      vm.datos.password2 = '';
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

      var target = $(this).attr('href');

      $('.tab-content > div').not(target).hide();

      $(target).hide();
    });
    //fin

    function signup() {
      var dataUserJSON = JSON.stringify(vm.datos);
      if ($scope.signupform.$valid) {
        dataservice.signup(dataUserJSON).then(function(response) {
          if (response === 'Usuario ya existe') {
            logger.error(response);
          } else if (response.email === vm.datos.email) {
            cookiesService.SetCredentials(response);
            logger.success('Usuario registrado con exito');
            // $scope.signupform.hide();
            headerService.login();
            $state.go('home');
          } else {
            logger.error(response);
          }
        });
      } else {
        logger.success('Datos incorrectos');
      }

    }

  }
})();
