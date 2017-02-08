(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('chatDirective', chatDirective);

  /* @ngInject */
  function chatDirective() {
    var directive = {
      ngEnter: ngEnter,
      restrict: 'EA'
    };
    return directive;

    function ngEnter() {
      return function (scope, element, attrs) {
          element.bind('keydown keypress', function (event) {
              if (event.which === 13) {
                  scope.$apply(function () {
                      scope.$eval(attrs.ngEnter);
                  });
                  event.preventDefault();
              }
          });
      };
    }
  }
})();
