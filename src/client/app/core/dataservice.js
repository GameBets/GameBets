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
      chatInsertMessage: chatInsertMessage,
      chatGetMessages: chatGetMessages
    };

    return service;

    function getMessageCount() { return $q.when(72); }

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

    function chatInsertMessage(data) {
      return $http.post('/api/chat_insertMessage', data)
        .then(sucess)
        .catch(fail);

      function sucess(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for insertMessage')(e);
      }
    }

    function chatGetMessages() {
      return $http.get('/api/chat_getMessages')
        .then(sucess)
        .catch(fail);

      function sucess(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for insertMessage')(e);
      }
    }
  }
})();
