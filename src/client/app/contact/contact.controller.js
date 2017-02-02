(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  /*** CONTACT ***/

  ContactController.$inject = ['dataservice', '$state', '$timeout'];

  function ContactController(dataservice, $state, $timeout) {
    var vm = this;

    vm.title = 'Contact';
    vm.inputName = '';
    vm.inputEmail = '';
    vm.inputSubject = '';
    vm.inputMessage = '';
    vm.SubmitContact = SubmitContact;

    function SubmitContact() {
      var data = {
        name: vm.inputName,
        from: vm.inputEmail,
        to: '',
        subject: vm.inputSubject,
        text: vm.inputMessage,
        type: 'admin'
      };
      console.log(data);
      dataservice.sendEmail(data).then(function(response) {
        if (response) {
          data.type = 'user';
          console.log(data);
          dataservice.sendEmail(data).then(function(response) {

            if (response) {
              vm.resultMessageOk = 'Email sended correctly';
              $timeout(function() {
                vm.resultMessageOk = '';
              //  $state.go('dashboard');
              }, 3000);
            } else {
              vm.resultMessageFail =
              'Error, Try later';
              $timeout(function() {
                vm.resultMessageFail = '';
              }, 3000);
            }
          });
        } else {
          vm.resultMessageFail =
            'Error, Try later';
          $timeout(function() {
            vm.resultMessageFail = '';
          }, 3000);
        }
      });

    }

  }
})();
