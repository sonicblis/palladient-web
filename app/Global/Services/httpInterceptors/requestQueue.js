app.service('requestQueue', ['$q', '$injector', '$rootScope', function($q, injector, $rootScope){
    'use strict';
    var pendingAuthRequest;

    this.responseError = function(response){
        if (response.status === 403) {
            var defer = $q.defer();
            var http = injector.get("$http");
            if (!pendingAuthRequest) { //if we've already requested auth, let's chain this to the pending request
                pendingAuthRequest = $rootScope.requestCredentials();
            }
            pendingAuthRequest.then(
                function () {
                    pendingAuthRequest = undefined;
                    defer.resolve();
                },
                function () {
                    pendingAuthRequest = undefined;
                    defer.reject();
                    return response;
                }
            );
            return defer.promise.then(
                function () {
                    return http(response.config);
                }
            );
        }
        else{
            return $q.reject(response);
        }
    };
}]);
