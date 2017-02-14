'use strict';

var app =
  angular
  .module('app.layout');

  app.config(function($translateProvider) {
   $translateProvider.fallbackLanguage('en');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    });

    $translateProvider.translations('en', {
      home: 'Home',
      conact_menu: 'Contact',
      welcome: 'Welcome:',
      logout_menu: 'Log Out',
      help: 'Help',
      how_to_use: 'How To Use',
      sign_up_menu: 'Sign Up',
      login_menu: 'Log In',

    });

    $translateProvider.translations('es', {
      home: 'Inicio',
      conact_menu: 'Contacto',
      welcome: 'Welcome: ',
      logout_menu: 'Salir',
      help: 'Ayuda',
      how_to_use: 'Como Usar Gamebets',
      sign_up_menu: 'Regístrate',
      login_menu: 'Entrar',

    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

  });
