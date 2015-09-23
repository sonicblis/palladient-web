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
