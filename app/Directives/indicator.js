'use strict';
app.directive("indicator", function(){
    return {
        restrict: 'E',
        link: function(scope, el, attrs){
            el.addClass("indicator");
        }
    };
});