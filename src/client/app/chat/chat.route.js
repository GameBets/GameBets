(function() {
  'use strict';

  angular
    .module('app.chat')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'chat',
        config: {
          url: '/chat',
          templateUrl: 'app/chat/chat.html',
          controller: 'ChatController',
          controllerAs: 'vm',
          title: 'Chat',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Chat'
          }
        }
      }
    ];
  }
})();
