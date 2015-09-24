app.directive("mustMatch", function() {
    'use strict';
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=mustMatch"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
