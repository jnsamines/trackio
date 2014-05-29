// trackio.js
// Módulo lanzador de la aplicación
// Author : Jonathan Samines

// configuracion de require
require.config({
    paths : {
        // external dependencies
        'jquery' : '../../bower_components/jquery/dist/jquery',
        'handlebars' : '../../bower_components/handlebars/handlebars',
        'history' : '../../bower_components/history.js/scripts/bundled-uncompressed/html4+html5'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});

require(['jquery', 'helpers/template', 'views/proyecto', 'history/native.history'], function($, TemplateHelper, ProyectoView, History){
    $(document).on('ready', function(){

        // register handlebars helpers
        var helper = new TemplateHelper();
        helper.registerHelpers();

        // main view
        var proyecto = new ProyectoView();
        proyecto.init();

        console.log('');

        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){
            var State = History.getState();
            console.log(State);
        });

    });
});



