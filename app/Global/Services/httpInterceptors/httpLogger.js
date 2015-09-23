app.service('httpLogger', ['$log', function($log){
    'use strict';
    this.request = function(config){
        $log.debug('request: ', config);
        return config;
    };
    this.requestError = function(config){
        $log.debug('request error: ', config);
        return config;
    };
    this.response = function(response){
        $log.debug('response: ', response);
        return response;
    };
    this.responseError = function(response){
        $log.debug('response: ', response);
        return response;
    };
}]);
