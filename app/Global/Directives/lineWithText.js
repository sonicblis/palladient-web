app.directive('lineWithText', function(){
    'use strict';
    return {
        restrict: 'E',
        transclude: true,
        template: "<div style=\"border-bottom: solid 1px #ccc; height: 10px; overflow: visible;\"><span style=\"padding: 0 5px; background: #eee;\"><ng-transclude></ng-transclude></span></div>"
    };
});
