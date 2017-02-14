(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('ControllerSocial', ControllerSocial);

    ControllerSocial.$inject = ['dataservice', '$state','$scope', '$translate', '$timeout', 'logger', 'cookiesService'];

    function ControllerSocial(dataservice, $scope, $translate,  $state, $timeout, logger, cookiesService) {
        var vm = this;

        social();



        function social() {

            dataservice.ControllerSocialLogin().then(function (response) {
                cookiesService.SetCredentials(response.data);
                LoginController.changeLanguage();
                logger.success('Usuario autentificado');
                $state.go('home');
            });
        }


    }
})();
