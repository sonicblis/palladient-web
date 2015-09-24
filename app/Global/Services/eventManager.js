app.service("EventManager", function () {
    'use strict';
    this.listeners = {};
    var that = this;

    return {
        when: function (eventName, delegate, waitForNewData) {
            console.log('when on:', eventName);
            if (!that.listeners[eventName]) {
                that.listeners[eventName] = {delegates: [delegate]};
            }
            else {
                if (that.listeners[eventName].delegates.indexOf(delegate) === -1) { //maybe only register a listener once?
                    that.listeners[eventName].delegates.push(delegate);
                    if (that.listeners[eventName].lastData && !waitForNewData){
                        console.log('calling eventName with previous data', that.listeners[eventName].lastData);
                        delegate(that.listeners[eventName].lastData);
                    }
                }
            }
            return {
                e: eventName,
                d: delegate,
                destroy: function () {
                    var indexOfDelegate = that.listeners[eventName].delegates.indexOf(delegate);
                    that.listeners[eventName].delegates.splice(indexOfDelegate, 1);
                }
            };
        },
        call: function (eventName, data, enableNoListenerWarning) {
            console.log('call to:', eventName);
            if (!that.listeners[eventName]) {
                that.listeners[eventName] = {delegates: [], lastData: data};
                if (enableNoListenerWarning)
                    alert(eventName + ' was triggered, but no one was listening');
            }
            else {
                that.listeners[eventName].lastData = data;
                that.listeners[eventName].delegates.forEach(function (delegate) {
                    delegate(data);
                });
            }
        }
    };
});
