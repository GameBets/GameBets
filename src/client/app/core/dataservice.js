(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      signup: signup
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function signup(data){
      console.log(data);
      return $http.post('/api/users_signup', data)
        .then(success)
        .catch(fail);

        function success(response) {
          return response.data;
        }

        function fail(e) {
          return exception.catcher('XHR Failed for sign up')(e);
        }
    }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
