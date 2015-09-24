app.controller("ConfirmationController", ['$scope', '$stateParams', 'accountService', function($scope, $stateParams, accountService){
    'use strict';
    $scope.account = accountService.account;

    //try to accept the invitation
    var invite = $scope.account.getInvite($stateParams.inviteId);
    invite.status = "Accepted";
    invite.update();
}]);
