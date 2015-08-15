app.directive("validationField", ['$parse', function($parse){
    'use strict';
    return {
        restrict: 'A',
        scope: true,
        transclude: true,
        template: '<div class="form-group has-feedback" ng-class="{\'has-success\': isValid()}">' +
                       '<span ng-transclude></span>' +
                       '<span class="glyphicon glyphicon-ok form-control-feedback" ng-show="isValid()"></span>' +
                  '</div>',
        link: function(scope, el, attrs){
            var isValid = $parse(attrs.validationField);
            scope.isValid = function(){
                return isValid(scope);
            };
        }
    };
}]);