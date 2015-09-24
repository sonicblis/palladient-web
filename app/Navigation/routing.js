'use strict';

app.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('/', {url: '/', templateUrl: '/app/Info/landing.html'})
        .state('register', {url: '/register', templateUrl: '/app/Users/register.html'})
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
        })
        .state('Confirm', {
            url: "/confirm/:inviteId",
            templateUrl: "app/Users/confirmation.html"
        }
    );
});