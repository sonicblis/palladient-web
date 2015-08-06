describe('loading the app', function(){
    "use strict";

    var $scope, $controller;

    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, _$controller_){
        $scope = $rootScope.$new();
        $controller = _$controller_;

        $controller('pageController', {
            $rootScope: $rootScope,
            $scope: $scope
        });
    }));

    it('loads', function(){

    });

    it('pageController getPageName sets equalityStillWorks', function(){
        expect($scope.getPageName()).toBe(true);
    });
});