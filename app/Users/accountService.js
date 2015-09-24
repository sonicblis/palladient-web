/**
 * Created by Palladient Dev on 9/22/2015.
 */
app.service("accountService", ['API', function(API){
    'use strict';
    var _this = this;
    this.account = {};

    this.account.registerAccount = function(){
        API.studios.save(_this.account);
    };
    this.account.login = function(){
        API.users.get(_this.account);
    };
    this.account.login = function(){
        API.users.patch(_this.account);
    };
    this.account.getInvite = function(inviteId){
        API.invitations.get({id: inviteId});
    };
}]);