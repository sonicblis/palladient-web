app.controller("registerController", ['$scope', 'accountService', function($scope, accountService){
    'use strict';
    $scope.account = accountService.account;
}]);
