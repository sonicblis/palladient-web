app.config(['$httpProvider', '$logProvider', '$authProvider', function($httpProvider, $logProvider, $authProvider){
    'use strict';
    ['errorHandler','httpLogger','requestCounter','requestQueue','resourceCreator'].forEach(function(interceptor){
        $httpProvider.interceptors.push(interceptor);
    });
    $logProvider.debugEnabled(false);
    $authProvider.google({
        clientId: '921192121163-jpmnst5i1q2jet14thmt0a1b2b03lhf4.apps.googleusercontent.com'
    });
}]);