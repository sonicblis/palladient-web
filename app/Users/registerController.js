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
