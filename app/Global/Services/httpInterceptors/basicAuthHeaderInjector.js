/**
 * Created by Palladient Dev on 9/23/2015.
 */
app.service('basicAuthHeaderInjector', [function() {
    'use strict';
    this.request = function (config) {
        if (config.params && config.params.email && config.params.password) {
            config.headers.Authorization = 'Basic ' + btoa(config.params.email + ":" + config.params.password); //base64 encoded username:password
            config.params = undefined;
        }
        if (config.params && config.params.password){
            delete config.params.password; //never send a password field, come on man, what are you doing
        }
        return config;
    };
}]);