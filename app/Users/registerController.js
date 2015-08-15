app.controller("registerController", ['$scope', 'API', function($scope, API){
    'use strict';
    $scope.account = {
        name: '',
        email: '',
        company: '',
        register: function(){
            API.studios.save(this);
        },
        federateWithGoogle: function(){
            alert('you can not yet log in with google.');
        }
    };
}]);
