// router.js
// Enrutador de acciones/uris del cliente
// Author : Jonathan Samines [jnsamines]

define(['history/native.history', 'helpers/observable'], function(History, Observable){

    var Router = function() {
        var self = this;
        this.routes = {};

        History.options.html4Mode = true;
        History.options.disableSuid = true;
        History.init();

        // Bind to StateChange Event
        History.Adapter.bind(window, 'statechange', function(){
            var state = History.getState();

            // se elimina el uid del estado
            var path = state.hash.replace('?&_suid=' + state.id, '');
            path = path.substring(1);
            console.log(path);

            // use uri data to generate template pattern for event triggering
            for(var prop in state.data){
                path = path.replace('/' + state.data[prop],'/:' +  prop);
            }

            self.trigger(path, state.data);
        });
    };

    Router.prototype = new Observable();

    // asocia una ruta a un evento especifico de cambio
    // <param name='title'>Titulo de la página</param>
    // <param name='routes'>Ruta o lista de rutas a escuchar</param>
    // <param name='callback'>Llamada de ejecución de ruta.</param>
    Router.prototype.route = function(routes, title, callback){
        if(Array.isArray(routes)){
            for(var r = 0; r <= routes.length - 1; r++){
                var route = routes[r];
                this.routes[ route ] = title;
                this.on(route, callback);
            }
        }else{
            this.routes[routes] = title;
            this.on(routes, callback);
        }
        return this;
    };

    // Acciona una ruta parametrizada
    // <param name='route'>Ruta a accionar.</param>
    // <param name='data'>Datos a enviar por la ruta.</param>
    Router.prototype.go = function(route, data){
        var title = this.routes[route] || '';

        console.log('going to : ' + route, ' page title : ' + title);
        History.pushState(data || {}, title, route);

        return this;
    };

    return Router;
});