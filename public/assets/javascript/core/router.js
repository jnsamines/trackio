// router.js
// Enrutador de acciones/uris del cliente
// Author : Jonathan Samines [jnsamines]

define(['history/native.history'], function(History){

    var Router = function(options){
        options = options || {};

        // Crea las relaciones entre las funciones definidas y el mapeo de ruta
        var mapper = options.routes;
        if(mapper){
            for(var route in mapper){

            }
        }

        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
        });
    };


    // <param name='map'>Objeto que define las relaciones</param>
    Router.prototype.map = function(map){

    };


});