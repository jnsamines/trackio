// controller.js
// Base controller for state orquestation
// Author : Jonathan Samines [jnsamines]

define(['jquery'], function($){

    var Controller = function(){};

    // get a list of data from de specified RUI
    // <param name='options'>options for data downloading</param>
    Controller.prototype.fetch = function(options){
        var deferred = $.Deferred(),
            promise = deferred.promise(),
            options = options || {},
            url = options.url || this.url;

        if(url.length === 0)
            deferred.reject('Uri for data sync is not provided.');

        // fetch data
        var result = $.get(url);
        result.done(function(data){
            deferred.resolve(data);
        });

        result.fail(function(error){
            deferred.reject('Error getting data from provided uri.');
        });

        return promise;
    };

    return Controller;
});
