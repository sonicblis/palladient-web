app.service('requestCounter', ['$rootScope', function($rootScope){
    'use strict';
    this.request = function(config){
        $rootScope.addPendingRequest();
        return config;
    };
    this.requestError = function(config){
        $rootScope.removePendingRequest();
        return config;
    };
    this.response = function(response){
        $rootScope.removePendingRequest();
        return response;
    };
    this.responseError = function(response){
        $rootScope.removePendingRequest();
        return response;
    };
}]);