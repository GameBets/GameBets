(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('socketFactory', socketFactory);

  socketFactory.$inject = ['$rootScope'];

  function socketFactory($rootScope) {

    var socket;
    var services = {
      on: on,
      emit: emit,
      init: init
    };

    return services;

    function init() {
      socket = io.connect('http://192.168.27.35:8081');
    }

    function on(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments;
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  }

})();
