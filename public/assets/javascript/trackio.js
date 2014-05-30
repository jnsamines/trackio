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

require(['jquery', 'helpers/template', 'views/proyecto', 'core/router'], function($, TemplateHelper, ProyectoView, Router){
    $(document).on('ready', function(){

        // register handlebars helpers
        var helper = new TemplateHelper();
        helper.registerHelpers();

        // main view
        var proyecto = new ProyectoView();
        proyecto.init();

        var router = new Router();

        router.route({
            title : 'Trackio - Perfil',
            path : '/perfil/:nombreUsuario'
        }, function(state){
            console.log(state);
        });

        router.route({ title : 'Tarea de Usuario', path : '/perfil/:codigoUsuario/tareas/:idtarea'}, function(state) {
            console.log(state);
        });

    });
});



