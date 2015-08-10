/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", ['ui.router']);

app.run(['$rootScope', function($rootScope){
    $rootScope.patterns = {
        email: '.+@.+\\..+',
        password: '^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$',
        name: '\\w+[ ]\\w+'
    };
}]);