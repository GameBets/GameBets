 'use strict';

  var app =
    angular
    .module('app.contact');

  app.config(function($translateProvider) {
    $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
      'en_*': 'en',
      'es_*': 'es'
    })

    $translateProvider.translations('en', {
      contact: "CONTACT",
      required: "This field is required",
      valid_email: "Email not valid",
      support: "SUPPORT",
      technical: "TECHNICAL SUPPORT",
      documentation: "DOCUMENTATION",

    });
    $translateProvider.translations('es', {
      contact: "CONTACTO",
      required: "El campo es obligatorio",
      valid_email: "El email no es válido",
      support: "SOPORTE",
      technical: "SOPORTE TÉCNICO",
      documentation: "DOCUMENTACIÓN",
    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

  });
