(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$http', 'dataservice', 'socketFactory'];
  /* @ngInject */
  function ChatController($scope, $http, dataservice, socketFactory) {
    var vm = this;
    $scope.pidMessages = null;
    $scope.pidPingServer = null;
    $scope.beep = new Audio('audio/beep.ogg');
    vm.messages = [];
    vm.online = null;
    $scope.lastMessageId = null;
    $scope.historyFromId = null;
    vm.me = {
        username: 'User_' + Math.round(Math.random() * 10000),
        message: null
    };
    var pageTitleNotificator = {
        vars: {
            originalTitle: window.document.title,
            interval: null,
            status: 0
        },
        on: function(title, intervalSpeed) {
            var self = this;
            if (!self.vars.status) {
                self.vars.interval = window.setInterval(function() {
                    window.document.title = (self.vars.originalTitle === window.document.title) ?
                    title : self.vars.originalTitle;
                },  intervalSpeed || 500);
                self.vars.status = 1;
            }
        },
        off: function() {
            window.clearInterval(this.vars.interval);
            window.document.title = this.vars.originalTitle;
            this.vars.status = 0;
        }
    };
    socketFactory.on('remit-message', function(data) {
      listMessages();
    });
    vm.saveMessage = function (form, callback) {
        if (vm.me.message !== '' && vm.me.message !== null) {
          dataservice.chatInsertMessage(vm.me).then(function(data) {
            vm.me.message = '';
            listMessages(true);
          });
          socketFactory.emit('new-message', {text: true});
        }
    };
    function replaceShortcodes(message) {
        var msg = '';
        msg = message.toString().replace(/(\[img])(.*)(\[\/img])/, '<img src="$2" />');
        msg = msg.toString().replace(/(\[url])(.*)(\[\/url])/, '<a href="$2">$2</a>');
        return msg;
    }
    function notifyLastMessage() {
        if (typeof window.Notification === 'undefined') {
            return;
        }
        window.Notification.requestPermission(function (permission) {
            var lastMessage = getLastMessage();
            if (permission === 'granted' && lastMessage && lastMessage.username) {
                var notify = new window.Notification(lastMessage.username + ' says:', {
                    body: lastMessage.message
                });
                notify.onclick = function() {
                    window.focus();
                };
                notify.onclose = function() {
                    pageTitleNotificator.off();
                };
                var timmer = setInterval(function() {
                    notify.close();
                    window.clearInterval(timmer);
                }, 10000);
            }
        });
    }
    function getLastMessage() {
        return vm.messages[vm.messages.length - 1];
    }
    function listMessages(wasListingForMySubmission) {
        dataservice.chatGetMessages().then(function(data) {
          console.log(data);
          vm.messages = [];
          angular.forEach(data.result, function(message) {
              vm.messages.push(message);
          });
          var lastMessage = getLastMessage();
          var lastMessageId = lastMessage && lastMessage.id;
          if ($scope.lastMessageId !== lastMessageId) {
              onNewMessage(wasListingForMySubmission);
          }
          $scope.lastMessageId = lastMessageId;
        });
    }
    function onNewMessage(wasListingForMySubmission) {
        if ($scope.lastMessageId && !wasListingForMySubmission) {
            playAudio();
            pageTitleNotificator.on('New message');
            notifyLastMessage();
        }
        scrollDown();
        window.addEventListener('focus', function() {
            pageTitleNotificator.off();
        });
    }
    /*function pingServer(msgItem) {
        return $http.post(var urlListOnlines, {}).success(function(data) {
            vm.online = data;
        });
    }*/
    function init() {
        listMessages();
    }
    function scrollDown() {
        var pidScroll;
        pidScroll = window.setInterval(function() {
          $('.direct-chat-messages').scrollTop(window.Number.MAX_SAFE_INTEGER * 0.001);
            window.clearInterval(pidScroll);
        }, 100);
    }
    function playAudio() {
        $scope.beep.play();
    }
    init();
  }
})();
