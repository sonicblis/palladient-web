app.controller("loginController", ['$scope', 'accountService', function($scope, accountService){
    'use strict';
    $scope.account = accountService.account;
}]);