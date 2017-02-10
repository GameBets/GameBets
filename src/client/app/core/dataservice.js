(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger','$rootScope','$state','$location'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, $rootScope, $state, $location) {
    var service = {
      sendEmail: sendEmail,
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      chatInsertMessage: chatInsertMessage,
      chatGetMessages: chatGetMessages,
      signup: signup,
      facebook: facebook
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function signup(data){
      console.log(data);
      return $http.post('/api/users_signup', data)
        .then(success)
        .catch(fail);

        function success(response) {
          console.log("RESPONSE");
          console.log(response.data);
          return response.data;
        }

        function fail(e) {
          console.log("FAIL");
          console.log('XHR Failed for sign up');
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


  /*  //================================================
       // Check if the user is connected
       //================================================
       function checkLoggedin(){

         return $http.get('/api/loggedin')
           .then(success)
           .catch(fail);

         function success(responseUser) {
            if (responseUser.data === '0'){
                $rootScope.authUser = false;
                $state.go('login');
           }else{
               $rootScope.authUser = responseUser.data;
           }
         }

         function fail(e) {
           return exception.catcher('XHR Failed for /api/loggedin')(e);
         }
       }

       function isLoggedin(){
         return $http.get('/api/loggedin')
           .then(success)
           .catch(fail);

         function success(responseUser) {
            if (responseUser.data === '0'){
                 $rootScope.authUser = false;
                return false;
           }else{
             $rootScope.authUser = responseUser.data;
             return responseUser.data;
           }
         }

         function fail(e) {
           return exception.catcher('XHR Failed for /api/loggedin')(e);
         }
       }

       function logout(){
         return $http({
               url: '/api/logout',
               method: 'POST'
           })
           .then(function(responseUser) {
               console.log('OKKK:'+responseUser);
                $rootScope.authUser =false;
               $state.go('/');

          },
          function(responseError) { // optional
              console.log('ERRRRROR: '+responseError);
              //$state.go('login');
          });
       }*/
        /// api faceboook
        function facebook() {
            return $http.get('/auth/success')
                    .then(success)
                    .catch(fail);

            function success(response) {

                return response;
            }

            function fail() {

                return false;
            }
        }


     }

   })();
