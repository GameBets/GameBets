(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('ControllerSocial', ControllerSocial);

    ControllerSocial.$inject = ['dataservice', '$translatePartialLoader', '$state', '$timeout', '$scope',
    '$translate', 'logger', 'cookiesService'];

    function ControllerSocial(dataservice, $translatePartialLoader, $state,
      $scope , $translate, $timeout, logger, cookiesService) {
        var vm = this;
        social();
        $translatePartialLoader.addPart('login');

        function social() {
            dataservice.ControllerSocialLogin().then(function (response) {
                cookiesService.SetCredentials(response.data);
                logger.success('Usuario autentificado');
                $state.go('home');
            });
        }
    }
})();
