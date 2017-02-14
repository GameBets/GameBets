(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('ControllerSocial', ControllerSocial);

    ControllerSocial.$inject = ['dataservice', '$state', '$timeout', '$scope',
    '$translate', 'logger', 'cookiesService'];

    function ControllerSocial(dataservice, $state, $scope , $translate, $timeout, logger, cookiesService) {
        var vm = this;

        social();
        changeLanguage();

        function changeLanguage() {
          $scope.changeLanguage = function(key) {
            $translate.use(key);
          };
        }

        function social() {
            dataservice.ControllerSocialLogin().then(function (response) {
                cookiesService.SetCredentials(response.data);
                logger.success('Usuario autentificado');
                $state.go('home');
            });
        }
    }
})();
