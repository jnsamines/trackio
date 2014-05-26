// model.js
// Base model for all client models, defines a method for tracking changes
// on properties an validation of data
// Author : Jonathan Samines [jnsamines]

define(['helpers/observable'], function(Observable){

    // global module properties
    var eventSchemaSeparator = ':',
        changeEventName = 'change',
        validateEventName = 'validate';

    // gets the change name event
    // <param name='event'>event name</param>
    function getChangeEvent(event){
        return changeEventName + eventSchemaSeparator + event;
    }

    // gets the validation event name
    // <param name='event'>event name</param>
    function getValidateEvent(event){
        return validateEventName + eventSchemaSeparator + event;
    }

    // changes de property values, validating de value and throwing all changing events
    // <param name='property'>Property to change</param>
    // <param name='value'>Value to set</param>
    // <param name='validate'>suggest if a property should throw validation events.</param>
    // <param name='triggerChangeEvents'>Indicates if should trigger changing events</param>
    function changePropertyValue(property, value, validate, triggerChangeEvents){
        var self = this, valid = true;

        // only throw events if validation is enabled
        if(validate === true || validate === undefined) {

            // report property validation event
            var results = self.trigger(getValidateEvent(property), property, self[property]);

            // verify if all validation events results valid
            for (var r = 0; r <= results.length - 1; r++) {
                var result = results[r].result;
                valid = !result; // the result of callback should be undefined or falsy value to pass the validation
            }
        }

        if(!valid) return;

        // change property value
        self[property] = value;

        if(triggerChangeEvents === true || triggerChangeEvents === undefined){
            // report value changed
            self.trigger( getChangeEvent(property), property, value);
            self.trigger( changeEventName , property, value );
        }
    }

    // base model
    // <param name='options'>configuration base options</param>
    var Model = function(options){
        options = options || {};

        // assign valid configuration options
        var self = this,
            events = options.events,
            defaults = options.defaults;

        // assign events controller
        if(events){
            for(var event in events){
                self.on( event, events[event], this);
            }
        }

        // defaults
        if(defaults){
            self.set(defaults, false, false);
        }

        this.initialize = typeof options.initialize === 'function' ? options.initialize  : function(){};
    };

    Model.prototype = new Observable();

    Model.prototype.get = function(property){
        return this[property];
    };

    // setter for single or complex values
    Model.prototype.set = function(){
        var self = this;

        // if the first argument datatype is object, then is a multiple setter call
        if(typeof arguments[0] === 'object'){
            var object = arguments[0];

            // copy each property to target object
            for(var property in object){
                if(object.hasOwnProperty(property)){
                    changePropertyValue.call(self, property, object[property], arguments[1], arguments[2]);
                }
            }
        }else{
            // if the first argument is a single value, then is the property name
            // and the second argument is the property value
            changePropertyValue.call(self, arguments[0], arguments[1], arguments[2], arguments[3]);
        }
    };

    return Model;
});