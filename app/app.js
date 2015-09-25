/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'config']);

app.config(['$httpProvider', '$logProvider', function($httpProvider, $logProvider){
    $logProvider.debugEnabled(false);
    var httpInterceptors = ['errorHandler','requestCounter','httpLogger','requestQueue','resourceCreator','basicAuthHeaderInjector'];
    httpInterceptors.forEach(function(interceptor){
        $httpProvider.interceptors.push(interceptor);
    });
}]);

app.run(['$rootScope', 'EventManager', function($rootScope){
    $rootScope.patterns = {
        email: '.+@.+\\..+',
        password: '^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$',
        name: '\\w+[ ]\\w+'
    };
    $rootScope.user = (sessionStorage.user) ? JSON.parse(sessionStorage.user) : {};
    $rootScope.httpRequestsPending = 0;
    $rootScope.logout = function(){
        console.log('logging out');
        $rootScope.user = {};
        delete sessionStorage.user;
    };
    $rootScope.removePendingRequest = function(){
        $rootScope.httpRequestsPending--;
    };
    $rootScope.addPendingRequest = function(){
        $rootScope.httpRequestsPending++;
    };
    $rootScope.events = {
        TenantLoaded: 'TenantLoaded',
        UserLoaded: 'UserLoaded'
    };
}]);