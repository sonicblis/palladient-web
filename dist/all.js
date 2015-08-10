/*jshint globalstrict: true*/
"use strict";

var app = angular.module("app", ['ui.router', 'ui.bootstrap', 'ngAnimate']);

app.run(['$rootScope', function($rootScope){
    $rootScope.patterns = {
        email: '.+@.+\\..+',
        password: '^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$',
        name: '\\w+[ ]\\w+'
    };
}]);
'use strict';
app.directive("indicator", function(){
    return {
        restrict: 'E',
        link: function(scope, el){
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

app.directive('ngEnter', function() {
    'use strict';
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.directive("validationField", ['$parse', function($parse){
    'use strict';
    return {
        restrict: 'A',
        scope: true,
        transclude: true,
        template: '<div class="form-group has-feedback" ng-class="{\'has-success\': isValid()}">' +
                       '<span ng-transclude></span>' +
                       '<span class="glyphicon glyphicon-ok form-control-feedback" ng-show="isValid()"></span>' +
                  '</div>',
        link: function(scope, el, attrs){
            var isValid = $parse(attrs.validationField);
            scope.isValid = function(){
                return isValid(scope);
            };
        }
    };
}]);
app.controller("landingController", ['$scope', function($scope){
    'use strict';
    $scope.slides = [
        {
            image: 'http://www.herveybayit.com.au/images/business.jpg',
            quote: '"Palladient didn\'t just improve things, it changed everything"',
            attribution: "Microsoft.com",
            textStyle: 'text-visible-inverse',
            textPosition: {top: '20px', left: '20px', width: '60%'}
        },
        {
            image: 'https://cdn.pbrd.co/images/2CjG2YFl.png',
            quote: '"We used to have to think.  Now, computers think for us."',
            attribution: 'United Nations',
            textStyle: 'text-visible',
            textPosition: {bottom: '20px', width: '100%'}
        }
    ];
}]);

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
        }
    );
});
app.controller("loginController", ['$scope', function($scope){

}]);

app.controller("registerController", ['$scope', function($scope){
    'use strict';
    $scope.account = {
        name: '',
        email: '',
        company: '',
        register: function(){
            alert('You can not yet register an account.');
        },
        federateWithGoogle: function(){
            alert('you can not yet log in with google.');
        }
    };
}]);
