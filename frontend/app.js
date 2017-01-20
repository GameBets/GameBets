var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'/*, 'ngCookies', 'facebook'*/]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                // Home
                .when("/", {
                  templateUrl: "frontend/modules/main/view/main.view.html",
                  controller: "mainCtrl"
                })

                // else 404
                .otherwise("/", {
                  templateUrl: "frontend/modules/main/view/main.view.html",
                  controller: "mainCtrl"
                });
    }]);

/*app.config([
    'FacebookProvider',
    function (FacebookProvider) {
        var myAppId = '1737270923197068';
        FacebookProvider.init(myAppId);
    }
]);*/
