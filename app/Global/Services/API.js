(function() {
    'use strict';
    app.service('API', ['$resource', 'config', function (resource, config) {
        var resourceParams = {id: '@id'};
        var resourceConfig = {update: {method: 'PUT'}, patch: {method: 'PATCH'}};

        function makeResource(resourceName){
            return resource(config.apiHostUrl + 'api/' + resourceName + "/:id", resourceParams, resourceConfig);
        }
        this.makeResourceFromUrl = function(url){
            return resource(url + "/:id", resourceParams, resourceConfig);
        };

        this.studios = makeResource('studios');
        this.users = makeResource('users');
        this.invitations = makeResource('invitations');
    }]);
})();
