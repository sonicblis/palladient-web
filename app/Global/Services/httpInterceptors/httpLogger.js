app.service('httpLogger', ['$log', function($log){
    'use strict';
    this.request = function(config){
        $log.info('request: ', config);
        return config;
    };
    this.requestError = function(config){
        $log.info('request error: ', config);
        return config;
    };
    this.response = function(response){
        $log.info('response: ', response);
        return response;
    };
    this.responseError = function(response){
        $log.info('response: ', response);
        return response;
    };
}]);
