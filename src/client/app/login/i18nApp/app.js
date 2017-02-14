'use strict';

var app =
  angular
  .module('app.login');

  app.config(function($translateProvider) {
   $translateProvider.fallbackLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    });

    $translateProvider.translations('en', {
      ////// LOGIN MODAL
      passwd: 'Password',
      email_login: 'E-Mail',
      sign_in: 'SIGN IN',
      login_F: 'Login using Facebook',
      login_Tw: 'Login using Twitter',
      login_Gplus: 'Login using Google+',
      reset_pw: '¿Forgotten your password?',
      //////////////// SIGN UP
      join_play: 'JOIN, PLAY,',
      win: 'WIN',
      usuario_home: 'User',
      required: 'El campo es obligatorio',
      user_req: 'Username could be have only letters and numbers',
      user_req_v2: 'Username could be have more 15 characters.',
      user_req_v3: 'Username could be have less than 5 characters',
      email_home: 'Email',
      email_valid: 'Email not valid',
      passwd_home: 'Password',
      password_req: 'The password could be have one uppercase letter, a normal letter and a special character',
      password_req_v1: 'The password could be have more than 8 characters',
      repeat_passwd: 'Repeat Passowrd',
      repeat_passwd_v1: 'The password not match.',
      sign_up_home: 'SIGN UP',
     });
    $translateProvider.translations('es', {
      /////////// LOGIN MODAL
      passwd: 'Contraseña',
      email_login: 'Correo',
      sign_in: 'ENTRAR',
      login_F: 'Entrar usando Facebook',
      login_Tw: 'Entrar usando Twiter',
      login_Gplus: 'Entrar con Google+',
      reset_pw: '¿Has olvidado tu contraseña?',
      ///////// SIGN UP
      join_play: 'ENTRA, JUEGA',
      win: 'GANA',
      usuario_home: 'Usuario',
      required: 'El campo es obligatorio',
      user_req: 'El nombre de usuario debe tener solo letras y numeros.',
      user_req_v2: 'El nombre de usuario debe tener menos de 15 caracteres.',
      user_req_v3: 'El nombre de usuario debe tener mas de 5 caracteres.',
      email_home: 'Email',
      email_valid: 'El email no es valido.',
      passwd_home: 'Contraseña',
      password_req: 'La contraseña debe tener al menos una letra minuscula, una mayuscula y un caracter especial.',
      password_req_v1: 'La contraseña debe tener mas de 8 caracteres.',
      repeat_passwd: 'Repetir la contraseña',
      repeat_passwd_v1: 'La contraseña no coincide.',
      sign_up_home: 'Registrarse',
    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

  });
