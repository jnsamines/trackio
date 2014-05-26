// controller.js
// Base controller for state orquestation
// Author : Jonathan Samines [jnsamines]

define(['jquery', 'core/model', 'helpers/observable'], function($, Model, Observable){

    // global module properties
    var addEventName = 'added',
        removeEventName = 'removed',
        clearEventName = 'cleared',
        fetchingEventName = 'fetching',
        fetchingSuccessEventName = 'fetching-success',
        fetchingErrorEventName = 'fetching-error';

    var Collection = function(options){
        options = options || {};

        // root url for model fetching
        this.url = options.url;
        this.collection = [];

        // verify if is a constructor function
        // if thats true, then create an instance from this function
        // and verify if this is an instance of Model
        if(typeof options.model !== 'function') throw new Error('The provided model isn´t a constructor function.');

        var instance = new options.model();

        if(!(instance instanceof Model)) throw new Error('The provided model isn´t an instance of Model');

        this.model = options.model;
    };

    Collection.prototype = new Observable();

    // Adds a new object to collection
    // <param name='model'>Model to add</param>
    Collection.prototype.add = function(model){
        this.collection.push(model);
        this.trigger(addEventName, model);
    };

    // Gets the element at the specified index
    // <param name='model'>Gets the specified model from collection</param>
    Collection.prototype.get = function(model){
        var index = this.collection.indexOf(model);

        return this.collection[index];
    };

    // Removes an element at specified index
    // <param name='index'>Index to remove from collection</param>
    Collection.prototype.removeAt = function(index){
        if(index !== -1) {
            var modelRemoved = this.collection.splice(index, 1);
            this.trigger(removeEventName, modelRemoved);
        }
    };

    // Removes an element from collection
    // <param name='model'>model to remove</param>
    Collection.prototype.remove = function(model){
        var index = this.collection.indexOf(model);
        this.removeAt(index);
    };

    // Empty collection
    Collection.prototype.clear = function(){
        var elements =  this.collection.length - 1;

        for(var i = elements; i >= 0; i--){
            this.removeAt(i);
        }

        this.trigger(clearEventName);
    };

    // Fetch data collections from specified url
    // <param name='options'>options for data fetching</param>
    Collection.prototype.fetch = function(options){
        options = options || {};
        var self = this, url = options.url || this.url;

        // verify if url is empty
        if(url.length === 0) console.warn('The provided url is incorrect.');

        var result = $.get(url);

        result.progress(function(progress){
            self.trigger(fetchingEventName, progress);
        });

        // fetching success
        result.done(function(models){
            self.clear();

            // add collection of models or single model
            if(Array.isArray(models)){
                for(var m = 0; m <= models.length - 1; m++){
                    var model = models[m], element;
                    self.add(new self.model(model));
                }
            }

            // throw fetched success
            self.trigger(fetchingSuccessEventName, self.collection);
        });

        // fetching error
        result.fail(function(error){
            self.trigger(fetchingErrorEventName, error);
        });
    };

    return Collection;
});
