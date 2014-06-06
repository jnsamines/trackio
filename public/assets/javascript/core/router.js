// router.js
// Enrutador de acciones/uris del cliente
// Author : Jonathan Samines [jnsamines]

define(['history/native.history', 'helpers/observable'], function(History, Observable){

    // globals
    var dataAttributePattern = 'data-[A-Za-z0-9]+',
        uriParamPattern = '/:[A-Za-z0-9]+';


    // Enrutador de acciones del cliente
    var Router = function() {
        var self = this;
        this.routes = {};

        // History configuration
        History.options.html4Mode = true;
        History.options.disableSuid = true;
        History.init();

        // se habilita el ruteo mediante data-route
        $('[data-route]').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();

            var expr = new RegExp(dataAttributePattern, 'gi');

            var $this = $(this),
                route = $this.attr('data-route'),
                attributes = this.attributes,
                params = {}, data = {};

            var exp = new RegExp(uriParamPattern,'gi');
            while(true){
                var param = exp.exec(route);
                if(param == null) break;

                param = param[0];
                param = param.replace('/:','');
                params[param.toLowerCase()] = param;
            }

            // se itera a través de los attributes
            // y se buscan todos los que tengan valores data-*
            // excluyendo data-route
            for(var v = 0; v <= attributes.length - 1; v++){
                var attribute = attributes[v];

                if(attribute.name === 'data-route') continue;
                if(!expr.test(attribute.name)) continue;

                var property = attribute.name.replace('data-','');
                property = params[property];
                data[property] = attribute.value;
            }

            var pattern = new RegExp('/:[A-Za-z0-9]+','gi'),
                path = '';
            for(var param in params){
                path = route.replace(pattern, '/' + data[ params[param] ])
            }

            self.go(path, data);
        });


        // Bind to StateChange Event
        History.Adapter.bind(window, 'statechange', function(){
            var state = History.getState();

            // se elimina el uid del estado
            var path = state.hash.replace('?&_suid=' + state.id, '');
            path = path.replace('./','');

            // use uri data to generate template pattern for event triggering
            for(var prop in state.data){
                path = path.replace('/' + state.data[prop],'/:' +  prop);
            }
            path = '/' + path;

            // se obtiene el titulo
            var title = self.routes[path] || '';

            // se reemplaza el template del titulo si es que existe
            for(var prop in state.data){
                title = title.replace('{' + prop + '}', state.data[prop]);
            }

            document.title = title;

            self.trigger(path, state.data);
        });
    };

    Router.prototype = new Observable();


    // asocia una ruta a un evento especifico de cambio
    // <param name='title'>Titulo de la página</param>
    // <param name='routes'>Ruta o lista de rutas a escuchar</param>
    // <param name='callback'>Llamada de ejecución de ruta.</param>
    Router.prototype.route = function(routes, title, callback){

        // se verifica el tipo de parametro que es "routes"
        // para asi poder asignar el handler correctamente
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
        History.pushState(data || {}, null, route);

        return this;
    };

    return Router;
});