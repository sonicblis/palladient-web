app.service('errorHandler', ['$q', '$injector', '$rootScope', '$log', function (q, injector, $rootScope, log) {
    'use strict';
    function tryGetInnerExceptionMessage(payload){
        if (payload.innerException){
            if (payload.innerException.innerException) {
                tryGetInnerExceptionMessage(payload.innerException);
            }
            else
            {
                return payload.innerException.exceptionMessage + ": " + payload.innerException.stackTrace;
            }
        }
        return undefined;

    }

    this.responseError = function (response) {
        if (response.status) {
            //TODO: recursively interrogate inner exceptions for the root message
            var details = (response.data) ?
                tryGetInnerExceptionMessage(response.data) ||
                response.data.exceptionMessage ||
                response.data.messageDetail ||
                response.data.message ||
                "The url " + response.config.url + " resulted in " + response.status + ": " + response.statusText :
                "No details available";
            toastr.error(details, '', {closeButton: true, timeOut: 0});
            if (details.indexOf('session has timed out') > -1){
                var $state = injector.get("$state");
                $state.go('login');
            }
        }
        return q.reject(response);
    };
}]);