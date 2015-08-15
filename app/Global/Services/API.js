(function() {
    'use strict';
    app.service('API', ['$resource', 'config', function (resource, config) {
        var resourceParams = {id: '@id'};
        var resourceConfig = {update: {method: 'PUT'}};
        var makeResource = function(resourceName){
            return resource(config.apiHostUrl + 'api/' + resourceName + "/:id", resourceParams, resourceConfig);
        };

        this.makeResourceFromUrl = function(url){
            return resource(url + "/:id", resourceParams, resourceConfig);
        };
        this.studios = makeResource('studios');
        this.users = makeResource('users');
    }]);
})();
