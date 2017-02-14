  'use strict';

  var app =
    angular
    .module('app.profile', ['pascalprecht.translate']);

    app.config(function($translateProvider) {
     $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
        'en_*': 'en',
        'es_*': 'es'
      })

      $translateProvider.translations('en', {
        h1_your_profile: "Your Profile",
        email: "E-Mail",
        id: "Id",
        username: "Username",
        avatar: "Avatar",
        BUTTON_LANG_EN: "ENGLISH",
        BUTTON_LANG_ES: "SPANISH"
      });
      $translateProvider.translations('es', {
        h1_your_profile: "Tu Perfil",
        email: "Correo Electronico",
        id: "Identificador",
        username: "Nombre del Usuario",
        avatar: "Icono",
        BUTTON_LANG_EN: "INGLES",
        BUTTON_LANG_ES: "ESPAÑOL"
      });

      $translateProvider.useSanitizeValueStrategy('escape');
      $translateProvider.preferredLanguage('en');

    });
