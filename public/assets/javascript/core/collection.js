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

    // Removes an element from collection
    // <param name='model'>model to remove</param>
    Collection.prototype.remove = function(model){
        var index = this.collection.indexOf(model),
            modelRemoved = this.collection.splice(index, 1);
        this.trigger(removeEventName, modelRemoved);
    };

    // Empty collection
    Collection.prototype.clear = function(){
        for(var i = 0; i <= this.collection.length - 1; i++){
            this.remove( this.collection[i] );
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
            if(Array.isArray(models)){
                for(var m = 0; m <= models.length - 1; m++){
                    var model = models[m];

                    self.add( new self.model(model));
                }
            }else{
                self.add(models);
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