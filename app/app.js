/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", ['ui.router']);

app.controller('pageController', ['$scope', function($scope){
    $scope.pageName = 'My Hot Page';
    $scope.getPageName = function(){
        if (1 === 1){
            return true;
        }
    };
}]);