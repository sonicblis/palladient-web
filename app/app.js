/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'config', 'satellizer']);

app.run(['$rootScope', '$window', 'GoogleAuthInfoProvider', function($rootScope, $window, GoogleAuthInfoProvider){
    $rootScope.patterns = {
        email: '.+@.+\\..+',
        password: '^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$',
        name: '\\w+[ ]\\w+'
    };
    $rootScope.googleAuthEnabled = false;
    $rootScope.user = (sessionStorage.user) ? JSON.parse(sessionStorage.user) : {};
    $rootScope.checkGoogleAuthResult = function(authResult){
        $rootScope.googleAuthEnabled = !(authResult && authResult.error);
        $rootScope.$digest();
    };
    $rootScope.initGooglAuth = function(){
        $window.gapi.load('auth2', function(){
            //sets up the AuthInstance for use in logging in/out/chcking login status/all sorts of stuff
            $window.gapi.auth2.init();
        });
        $window.gapi.load('auth', function(){
            //this call is to check if the user has connected google auth or not
            $window.gapi.auth.authorize({
                client_id: GoogleAuthInfoProvider.clientId,
                scope: GoogleAuthInfoProvider.scope,
                immediate: true
            }, $rootScope.checkGoogleAuthResult);
        });
    };
    $rootScope.httpRequestsPending = 0;
    $rootScope.logout = function(){
        $rootScope.user = {};
        delete sessionStorage.user;
    };
    $rootScope.removePendingRequest = function(){
        $rootScope.httpRequestsPending++;
    };
    $rootScope.addPendingRequest = function(){
        $rootScope.httpRequestsPending--;
    };
    $rootScope.events = {
        TenantLoaded: 'TenantLoaded',
        UserLoaded: 'UserLoaded'
    };
}]);