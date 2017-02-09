(function() {
    'use strict';

    /* recommended */
    angular
      .module('app.users')
      .directive('htSignIn', htSignIn);

    function htSignIn() {
      var directive = {
        submitform: submitform,
        templateUrl: '/src/client/app/users/signin.html',
        restrict: 'EA'
      };
      return directive;

      function submitform() {
        return function(scope, element, attrs) {
          element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
              scope.$apply(function() {
                scope.$eval(attrs.submitform);
              });
            }
          });
        }
      }


    }
  });
