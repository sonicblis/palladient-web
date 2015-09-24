app.controller("ConfirmationController", ['$scope', '$stateParams', 'accountService', function($scope, $stateParams, accountService){
    'use strict';
    $scope.account = accountService.account;

    //try to accept the invitation
    $scope.account.getFromInvite($stateParams.inviteId);
}]);
