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
