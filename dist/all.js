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
app.config(['$httpProvider', '$logProvider', '$authProvider', function($httpProvider, $logProvider, $authProvider){
    'use strict';
    ['errorHandler','httpLogger','requestCounter','requestQueue','resourceCreator'].forEach(function(interceptor){
        $httpProvider.interceptors.push(interceptor);
    });
    $logProvider.debugEnabled(false);
    $authProvider.google({
        clientId: '921192121163-jpmnst5i1q2jet14thmt0a1b2b03lhf4.apps.googleusercontent.com'
    });
}]);
app.controller("landingController", ['$scope', function($scope){
    'use strict';
    $scope.slides = [
        {
            image: '/img/carousel/un.jpg',
            quote: '"We used to have to think.  Now, computers think for us."',
            attribution: 'United Nations',
            textStyle: 'text-visible',
            textPosition: {top: '20px', width: '100%'}
        },
        {
            image: '/img/carousel/business.jpg',
            quote: '"Palladient didn\'t just improve things, it changed everything"',
            attribution: "Microsoft.com",
            textStyle: 'text-visible-inverse',
            textPosition: {top: '20px', left: '20px', width: '60%'}
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
app.controller("loginController", ['$scope', 'API', '$rootScope', 'GoogleAuthInfoProvider', function($scope, API, $rootScope, GoogleAuthInfoProvider){
    'use strict';
    $scope.account = {
        email: '',
        password: ''
    };

    $scope.loginViaGoogle = function(result){
        console.log(result);
        var authResponse = result.getAuthResponse();
        var token = authResponse.id_token;
        API.users.get({token: token}, $scope.setUser);
    };

    $scope.authenticate = function(){
        API.users.get($scope.account, $scope.setUser);
    };

    $scope.setUser = function(user){
        $rootScope.user = user;
        sessionStorage.user = JSON.stringify(user);
    };
}]);

app.controller("registerController", ['$scope', 'API', '$auth', '$rootScope', '$window', 'GoogleAuthInfoProvider', function($scope, API, $auth, $rootScope, $window, GoogleAuthInfoProvider){
    'use strict';
    $rootScope.$on("googleAuthInfoProvided", function(){
        $scope.account.federateWithGoogle($window.googleAuthResult);
    });

    $scope.account = {
        name: '',
        email: '',
        company: '',
        authToken: '',
        register: function(){
            API.studios.save(this);
        },
        federateWithGoogle: function(result){
            if (result){
                console.log('from controller: ', result);
                var profileInfo = result.getBasicProfile();
                var authInfo = result.getAuthResponse();
                $scope.account.name = profileInfo.getName();
                $scope.account.email = profileInfo.getEmail();
                $scope.account.authToken = authInfo.id_token;
                $rootScope.user.isGoogleAuthenticated = true;
                $scope.$digest();
            }
        }
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
(function() {
    'use strict';
    app.service('API', ['$resource', 'config', function (resource, config) {
        var resourceParams = {id: '@id'};
        var resourceConfig = {update: {method: 'PUT'}};
        var makeResource = function(resourceName){
            return resource(config.apiHostUrl + 'api/' + resourceName + "/:id", resourceParams, resourceConfig);
        };

        this.makeResourceFromUrl = function(url){
            return resource(url + "/:id", resourceParams, resourceConfig);
        };
        this.studios = makeResource('studios');
        this.users = makeResource('users');
    }]);
})();

app.service("EventManager", function () {
    'use strict';
    this.listeners = {};
    var that = this;

    return {
        when: function (eventName, delegate, waitForNewData) {
            console.log('when on:', eventName);
            if (!that.listeners[eventName]) {
                that.listeners[eventName] = {delegates: [delegate]};
            }
            else {
                if (that.listeners[eventName].delegates.indexOf(delegate) == -1) { //maybe only register a listener once?
                    that.listeners[eventName].delegates.push(delegate);
                    if (that.listeners[eventName].lastData && !waitForNewData){
                        console.log('calling eventName with previous data', that.listeners[eventName].lastData);
                        delegate(that.listeners[eventName].lastData);
                    }
                }
            }
            return {
                e: eventName,
                d: delegate,
                destroy: function () {
                    var indexOfDelegate = that.listeners[eventName].delegates.indexOf(delegate);
                    that.listeners[eventName].delegates.splice(indexOfDelegate, 1);
                }
            };
        },
        call: function (eventName, data, enableNoListenerWarning) {
            console.log('call to:', eventName);
            if (!that.listeners[eventName]) {
                that.listeners[eventName] = {delegates: [], lastData: data};
                if (enableNoListenerWarning)
                    alert(eventName + ' was triggered, but no one was listening');
            }
            else {
                that.listeners[eventName].lastData = data;
                that.listeners[eventName].delegates.forEach(function (delegate) {
                    delegate(data);
                });
            }
        }
    }
});

app.service("GoogleAuthInfoProvider", [function(){
    'use strict';
    this.clientId = '921192121163-jpmnst5i1q2jet14thmt0a1b2b03lhf4.apps.googleusercontent.com';
    this.scope = 'https://www.googleapis.com/auth/plus.me';
}]);

app.directive('googleLogInButton', [function(){
    'use strict';
    return {
        restrict: 'E',
        scope: {
            buttonId: '@',
            onAuth: '&',
            width: '@'
        },
        template: '<div id="{{buttonId}}" class="text-center"></div>',
        controller: ['$scope', 'GoogleAuthInfoProvider', '$window', '$timeout', function($scope, GoogleAuthInfoProvider, $window, $timeout){
            $scope.renderButton = function() {
                $timeout(function() {
                    $window.gapi.signin2.render($scope.buttonId, {
                        'scope': GoogleAuthInfoProvider.scope,
                        'width': $scope.width || 300,
                        'height': 30,
                        'longtitle': true,
                        'theme': 'dark',
                        'onsuccess': function(result){
                            $scope.onAuth({result: result});
                        }
                    });
                });
            };
        }],
        link: function(scope, el, attrs){
            scope.renderButton();
        }
    };
}]);

app.service('errorHandler', ['$q', '$injector', '$rootScope', '$log', function (q, injector, $rootScope, log) {
    'use strict';
    function tryGetInnerExceptionMessage(payload){
        if (payload.innerException){
            if (payload.innerException.innerException) {
                tryGetInnerExceptionMessage(payload.innerException);
            }
            else
            {
                return payload.innerException.exceptionMessage + ": " + payload.innerException.stackTrace;
            }
        }
        return undefined;

    }

    this.responseError = function (response) {
        if (response.status) {
            //TODO: recursively interrogate inner exceptions for the root message
            var details = (response.data) ?
                tryGetInnerExceptionMessage(response.data) ||
                response.data.exceptionMessage ||
                response.data.messageDetail ||
                response.data.message ||
                "The url " + response.config.url + " resulted in " + response.status + ": " + response.statusText :
                "No details available";
            toastr.error(details, '', {closeButton: true, timeOut: 0});
            if (details.indexOf('session has timed out') > -1){
                var $state = injector.get("$state");
                $state.go('login');
            }
        }
        return q.reject(response);
    };
}]);
app.service('httpLogger', ['$log', function($log){
    'use strict';
    this.request = function(config){
        $log.debug('request: ', config);
        return config;
    };
    this.requestError = function(config){
        $log.debug('request error: ', config);
        return config;
    };
    this.response = function(response){
        $log.debug('response: ', response);
        return response;
    };
    this.responseError = function(response){
        $log.debug('response: ', response);
        return response;
    };
}]);

app.service('requestCounter', ['$rootScope', function($rootScope){
    'use strict';
    this.request = function(config){
        $rootScope.addPendingRequest();
        return config;
    };
    this.requestError = function(config){
        $rootScope.removePendingRequest();
        return config;
    };
    this.response = function(response){
        $rootScope.removePendingRequest();
        return response;
    };
    this.responseError = function(response){
        $rootScope.removePendingRequest();
        return response;
    };
}]);
app.service('requestQueue', ['$q', '$injector', '$rootScope', function(q, injector, $rootScope){
    'use strict';
    var pendingAuthRequest;

    this.responseError = function(response){
        if (response.status === 403) {
            var defer = q.defer();
            var http = injector.get("$http");
            if (!pendingAuthRequest) { //if we've already requested auth, let's chain this to the pending request
                pendingAuthRequest = $rootScope.requestCredentials();
            }
            pendingAuthRequest.then(
                function () {
                    pendingAuthRequest = undefined;
                    defer.resolve();
                },
                function () {
                    pendingAuthRequest = undefined;
                    defer.reject();
                    return response;
                }
            );
            return defer.promise.then(
                function () {
                    return http(response.config);
                }
            );
        }
    };
}]);

app.service('resourceCreator', ['$injector', '$log', function(injector, $log){
    'use strict';
    function findAllResources(response){
        if (response && response.data){
            if (typeof response.data === 'object' && !(response.data instanceof Array)) {
                var API = injector.get("API");
                for (var key in response.data) {
                    if (key.indexOf('Resource', key.length - 8) !== -1 && typeof response.data[key] === 'string' && response.data[key].indexOf('http://') > -1) {
                        $log.info('found a resource:', response.data[key]);
                        response.data[key] = API.makeResourceFromUrl(response.data[key]);
                    }
                    else{
                        findAllResources({  //for finding resources of child objects like user.tenant.industriesResource
                            data: response.data[key]
                        });
                    }
                }
            }
            else if (response.data instanceof Array){  //find resources for each item in the array
                response.data.forEach(
                    function(item){
                        findAllResources({
                            data: item
                        });
                    }
                );
            }
        }
    }

    this.response = function(response){
        findAllResources(response);
        return response;
    };
}]);
