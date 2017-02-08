(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function ContactController($q, dataservice, logger) {

  }
})();
