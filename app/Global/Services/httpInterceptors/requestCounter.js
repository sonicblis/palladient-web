app.service('requestCounter', ['$rootScope', '$q', function($rootScope, $q){
    'use strict';
    this.request = function(config){
        $rootScope.addPendingRequest();
        return config;
    };
    this.requestError = function(config){
        $rootScope.removePendingRequest();
        return $q.reject(config);
    };
    this.response = function(response){
        $rootScope.removePendingRequest();
        return response;
    };
    this.responseError = function(response){
        $rootScope.removePendingRequest();
        return $q.reject(response);
    };
}]);