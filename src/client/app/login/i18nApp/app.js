'use strict';

var app =
  angular
  .module('app.login', ['pascalprecht.translate']);

  app.config(function($translateProvider) {
   $translateProvider.fallbackLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    })

    $translateProvider.translations('en', {
      passwd: "Password",
      email_login: "E-Mail",
      sing_in: "Sign In",
      login_F: "Login using Facebook",
      login_Tw: "Login using Twitter",
      login_Gplus: "Login using Google+",
      reset_pw: "¿Forgotten your password?"
     });
    $translateProvider.translations('es', {
      passwd: "Contraseña",
      email_login: "Correo",
      sing_in: "Entrar",
      login_F: "Entrar usando Facebook",
      login_Tw: "Entrar usando Twiter",
      login_Gplus: "Entrar usando Google+",
      reset_pw: "¿Has olvidado tu contraseña?"
    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

  });
