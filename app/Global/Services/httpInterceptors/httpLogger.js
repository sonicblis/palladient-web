app.service('httpLogger', ['$log', '$rootScope', '$q', function($log, $rootScope, $q){
    'use strict';
    this.request = function(config){
        $log.debug('request ' + $rootScope.httpRequestsPending + ': ', config);
        return config;
    };
    this.requestError = function(config){
        $log.debug('request error ' + $rootScope.httpRequestsPending + ': ', config);
        return $q.reject(config);
    };
    this.response = function(response){
        $log.debug('response ' + $rootScope.httpRequestsPending + ': ', response);
        return response;
    };
    this.responseError = function(response){
        $log.debug('response ' + $rootScope.httpRequestsPending + ': ', response);
        return $q.reject(response);
    };
}]);
