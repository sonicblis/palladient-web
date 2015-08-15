app.service('resourceCreator', ['$injector', '$log', function(injector, $log){
    'use strict';
    function findAllResources(response){
        if (response && response.data){
            if (typeof response.data === 'object' && !(response.data instanceof Array)) {
                var API = injector.get("API");
                for (var key in response.data) {
                    if (key.indexOf('Resource', key.length - 8) !== -1 && typeof response.data[key] === 'string' && response.data[key].indexOf('http://') > -1) {
                        $log.info('found a resource:', response.data[key]);
                        response.data[key] = API.makeResourceFromUrl(response.data[key]);
                    }
                    else{
                        findAllResources({  //for finding resources of child objects like user.tenant.industriesResource
                            data: response.data[key]
                        });
                    }
                }
            }
            else if (response.data instanceof Array){  //find resources for each item in the array
                response.data.forEach(
                    function(item){
                        findAllResources({
                            data: item
                        });
                    }
                );
            }
        }
    }

    this.response = function(response){
        findAllResources(response);
        return response;
    };
}]);
