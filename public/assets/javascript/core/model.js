// model.js
// Base model for all client models, defines a method for tracking changes
// on properties an validation of data
// Author : Jonathan Samines [jnsamines]

define(['helpers/observable'], function(Observable){

    // base model
    var Model = function(){
        // event model
        this.eventSchemaSeparator = ':';
        this.changeEventName = 'change';
        this.validateEventName = 'validate';
    };

    Model.prototype = new Observable();

    // gets the change name event
    // <param name='event'>event name</param>
    Model.prototype.getChangeEvent = function(event){
        return this.changeEventName + this.eventSchemaSeparator + event;
    };

    // gets the validation event name
    // <param name='event'>event name</param>
    Model.prototype.getValidateEvent = function(event){
        return this.validateEventName + this.eventSchemaSeparator + event;
    };

    // changes de property values, validating de value and throwing all changing events
    // <param name='property'>Property to change</param>
    // <param name='value'>Value to set</param>
    // <param name='validate'>suggest if a property should throw validation events.</param>
    function changePropertyValue(property, value, validate){
        var self = this, valid = true;

        // only throw events if validation is enabled
        if(validate === true || validate === undefined) {

            // report property validation event
            var results = self.trigger(self.getValidateEvent(property), property, oldValue);

            // verify if all validation events results valid
            for (var r = 0; r <= results.length - 1; r++) {
                var result = results[r].result;
                valid = !result; // the result of callback should be undefined or falsy value to pass the validation
            }
        }

        if(!valid) return;

        // change property value
        self[property] = value;

        // report value changed
        self.trigger( self.getChangeEvent(property), property, value);
        self.trigger( self.changeEventName , property, value );
    }


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
                    changePropertyValue.call(self, property, object[property], arguments[1]);
                }
            }
        }else{
            // if the first argument is a single value, then is the property name
            // and the second argument is the property value
            changePropertyValue.call(self, arguments[0], arguments[1], arguments[2]);
        }
    };

    return Model;
});