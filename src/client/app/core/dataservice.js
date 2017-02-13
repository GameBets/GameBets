(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', 'exception', 'logger', '$state', '$location', '$q', '$rootScope'];
  /* @ngInject */
  function dataservice($http, exception, logger, $state, $location, $q, $rootScope) {
    var service = {
      sendEmail: sendEmail,
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      chatInsertMessage: chatInsertMessage,
      chatGetMessages: chatGetMessages,
      signup: signup,
      ControllerSocialLogin: ControllerSocialLogin,
      localSignIn: localSignIn
    };

    return service;

    function getMessageCount() {
      return $q.when(72);

    }

    function localSignIn(data) {
      return $http.post('/api/users_signin', data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for sign up')(e);
      }
    }

    function signup(data) {
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

    function login(data) {
      return $http.post('/api/login', data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail() {
        return false;
      }
    }

    function logout() {
      return $http({
          url: '/api/logout',
          method: 'POST'
        })
        .then(function(responseUser) {
            $rootScope.authUser = false;
            $state.go('/');

          },
          function(responseError) { // optional
            console.log('ERRRRROR: ' + responseError);
            //$state.go('login');
          });
    }

    function ControllerSocialLogin() {
      return $http.get('/auth/success')
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for socialSignin')(e);
      }
    }

  }

})();
