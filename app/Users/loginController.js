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
