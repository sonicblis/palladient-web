/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", []);

app.controller('pageController', ['$scope', function($scope){
    $scope.pageName = 'My Hot Page';
    $scope.getPageName = function(){

    };
}]);