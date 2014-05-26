// observable.js
// Observe pattern implementation and tracking of changes
// Author : Jonathan Samines [jnsamines]

define(function(){
    // Observable base object
    var Observable = function(){
        this.events = {};
    };

    // Add a new suscriber for a defined event
    // <param name='event'>Evento to suscribe</param>
    // <param name='callback'>Function callback</param>
    // <param name='context'>Execution context</param>
    Observable.prototype.on = function(event, callback, context){
        // suscriber signature to save
        var suscriber = {
            callback : callback,
            context : context
        };

        // find out if there is a event initialized
        if(this.events[event] === undefined){
            this.events[event] = [];
        }

        // add suscriber to event list
        this.events[event].push(suscriber);

        return this;
    };

    // Removes a suscriber from event
    // <param name='event'>Evento to unsuscribe</param>
    // <param name='callback'>Function callback</param>
    // <param name='context'>Execution context</param>
    Observable.prototype.off = function(event, callback, context){
        var suscribers = this.events[event];

        // if there is no suscribers asociated, the function ends
        if(suscribers === undefined) return this;

        for(var s = 0; s <= suscribers.length - 1; s++){
            var suscriber = suscribers[s];

            if(suscriber.callback == callback && suscriber.context == context){
                suscribers.splice(s, 1);
                return this;
            }
        }

        return this;
    };

    // Throw a event an report to all suscribers
    // <param name='event'>Event to trigger</param>
    Observable.prototype.trigger = function(event){
        var result = [], suscribers = this.events[event],
            args = Array.prototype.slice.call(arguments, 1); // remove first element ( eventname )

        // if there is no suscribers associated, the function ends
        if(suscribers === undefined) return this;

        // notify to suscribers
        for(var s = 0; s <= suscribers.length - 1; s++){
            var suscriber = suscribers[s];

            // call callback function with the specified context and arguments
            result[s] = {
                result : suscriber.callback.apply(suscriber.context, args)
            };
        }

        return result;
    };

    return Observable;
});