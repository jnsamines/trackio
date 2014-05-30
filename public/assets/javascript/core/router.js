// router.js
// Enrutador de acciones/uris del cliente
// Author : Jonathan Samines [jnsamines]

define(['history/native.history', 'helpers/observable'], function(History, Observable){

    var Router = function(){
        var self = this;
        this.routes = [];

        // Bind to StateChange Event
        History.Adapter.bind(window, 'statechange', function(){
            var state = History.getState(), mapper = [];

            // se elimina el uid del estado
            var path = state.hash.replace('?&_suid=' + state.id, '');

            // se recorre cada ruta, para verificar si hay alguna que coincida
            // con el patron del path actual
            for(var r = 0; r <= self.routes.length - 1; r++){
                var route = self.routes[r],
                    expr = new RegExp('/:[a-zA-Z0-9]+','gi'),
                    param = '', mapping = {};

                // se extrae cada holder de parámetro del patrón
                while(true){
                    param = expr.exec(route);
                    // si no encuentra coincidencias, termina la búsqueda
                    if(param === null) break;

                    param = param[0]; // param[0] = el valor real del parámetro

                    // se obtiene la posicion de inicio, para poder calcular la posicion
                    // desde la cual se debe extraer el parametro en la ruta real
                    var from = route.indexOf(param) + 1;

                    var value = path.substring(from);

                    value = value.substring(0, value.indexOf('/'));

                    // se quita la información adicional del parametro '/:'
                    param = param.substring(2, param.length );

                    mapping[param] = value;
                }
                mapper.push(mapping);
            }

            // se lanza el evento de encuentro de ruta
            console.log(mapper);

            this.trigger(path, mapper);
        });
    };

    Router.prototype = new Observable();

    // asocia una ruta a un evento especifico de cambio
    Router.prototype.route = function(options, callback){
        this.routes.push(options.path);

        // llamamos internamente al método on, para asociar el evento
        // con el manejador de eventos internos
        Router.prototype.on(options.path, callback);
    };

    return Router;
});