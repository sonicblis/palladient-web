/**
 * Created by Palladient Dev on 9/22/2015.
 */
app.service("accountService", ['API', '$q', function(API, $q){
    'use strict';
    var _this = this;
    this.account = {
        name: '',
        email: '',
        company: ''
    };

    this.account.registerAccount = function(){
        var defer = $q.defer();
        API.studios.save(_this.account, function(result){
            defer.resolve(result);
        });
        return defer.promise;
    };
    this.account.login = function(){
        return API.users.get(_this.account);
    };
    this.account.acceptInvitation = function(){
        if (!_this.account.invitation){
            alert('This account isn\'t associated with an invitation to accept');
        }
        else{
            _this.account.invitation.status = "Accepted";
            API.invitations.update(_this.account.invitation);
        }
    };
    this.account.getFromInvite = function(inviteId){
        var defer = $q.defer();
        API.invitations.get({id: inviteId}, function(invitation){
            _this.account.name = invitation.subscriberFirstName + " " + invitation.subscriberLastName;
            _this.account.email = invitation.subscriberEmailAddress;
            _this.account.company = invitation.subscriberCompanyName;
            _this.account.invitation = invitation;
            defer.resolve(invitation);
        });
        return defer.promise;
    };
}]);