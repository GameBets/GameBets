(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('ControllerSocial', LoginController);

    LoginController.$inject = ['dataservice', '$state', '$timeout', 'logger'];

    function LoginController(dataservice, $state, $timeout, logger) {
        var vm = this;

        social();

        function social() {

            dataservice.facebook().then(function (response) {
                console.log(response);
                logger.success('Usuario autentificado');
                $state.go('home');
            });
        }
    }
})();
