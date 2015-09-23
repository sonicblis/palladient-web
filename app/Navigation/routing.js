'use strict';

app.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('/', {url: '/', templateUrl: '/app/Info/landing.html'})
        .state('register', {url: '/register', templateUrl: '/app/Users/register.html'})
        .state('Design', {
            url: "/design",
            templateUrl: "app/design/index.html"
        })
        .state('Configure', {
            url: "/configure",
            templateUrl: "app/configure/index.html"
        })
        .state('Work', {
            url: "/work",
            templateUrl: "app/work/index.html"
        })
        .state('Shop', {
            url: "/shop",
            templateUrl: "app/shop/index.html"
        }
    );
});