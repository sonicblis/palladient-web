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
'use strict';
app.directive("indicator", function(){
    return {
        restrict: 'E',
        link: function(scope, el, attrs){
            el.addClass("indicator");
        }
    };
});
app.directive('lineWithText', function(){
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: "<div style=\"border-bottom: solid 1px #ccc; height: 10px; overflow: visible;\"><span style=\"padding: 0 5px; background: #eee;\"><ng-transclude></ng-transclude></span></div>"
    };
});

'use strict';

app.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/login")

    $stateProvider
        .state('login', {url: '/login', templateUrl: '/app/Users/login.html'})
        .state('Design', {
            url: "/design",
            templateUrl: "partials/design/design.html"
        })
        .state('Configure', {
            url: "/configure",
            templateUrl: "partials/configure/configure.html"
        })
        .state('Work', {
            url: "/work",
            templateUrl: "partials/work/work.html"
        })
        .state('Shop', {
            url: "/shop",
            templateUrl: "partials/shop/shop.html"
        }
    );
})