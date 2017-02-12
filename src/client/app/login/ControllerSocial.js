(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('ControllerSocial', LoginController);

    LoginController.$inject = ['dataservice', '$state', '$timeout', 'logger', 'cookiesService'];

    function LoginController(dataservice, $state, $timeout, logger, cookiesService) {
        var vm = this;

        social();

        function social() {

            dataservice.ControllerSocialLogin().then(function (response) {
                console.log(response);
                cookiesService.SetCredentials(response.data);
                logger.success('Usuario autentificado');
                $state.go('home');
            });
        }

    }
})();
