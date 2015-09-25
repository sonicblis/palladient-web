app.service('errorHandler', ['$q', '$injector', function (q, injector) {
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

    function extractMessage(response){
        return (response.data) ?
        tryGetInnerExceptionMessage(response.data) ||
        response.data.exceptionMessage ||
        response.data.messageDetail ||
        response.data.message ||
        "The url " + response.config.url + " resulted in " + response.status + ": " + response.statusText :
            "Request Error: No details available";
    }

    this.responseError = function (response) {
        if (response.status) {
            var details = extractMessage(response);
            toastr.error(details, '', {closeButton: true, timeOut: 0});
        }
        return q.reject(response);
    };
}]);