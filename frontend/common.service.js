app.factory("CommonService", ['$rootScope','$timeout', function ($rootScope, $timeout) {
        var service = {};
        service.amigable = amigable;
        return service;
        function amigable(url) {
            var link = "";
            url = url.replace("?", "");
            url = url.split("&");

            for (var i = 0; i < url.length; i++) {
                var aux = url[i].split("=");
                link += aux[1] + "/";
            }
            return link;
        }
    }]);