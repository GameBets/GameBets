(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      sendEmail: sendEmail
    //  login: login
    };

    return service;

    function sendEmail(data) {

      return $http.post('/api/sendmail', data)
        .then(success)
        .catch(fail);

      function success() {
        return true;
      }

      function fail() {
        return false;
      }
    }



    function login(data) {
      return $http.post('/api/login', data)
        .then(success)
        .catch(fail);
      //console.log("success: "+success);
      //console.log("fail: "+fail);

      // Success
      function success(response) {
        return response;
      }
      //Fail
      function fail() {
        return false;
      }
    }

  }

})();
